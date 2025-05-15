import Koa from 'koa';
import leakyBucketMiddleware from '../middlewares/leakyBucketMiddleware';
import { LeakyBucket } from '../models/bucket/bucket';
import BucketsHolder from '../models/bucket/bucketsHolder';

jest.mock('../models/bucket/bucketsHolder');

describe('Leaky Bucket Middleware', () => {
    let mockBucket: jest.Mocked<LeakyBucket>;
    let mockHolder: jest.Mocked<BucketsHolder>;
    let context: Koa.Context;
    let next: jest.Mock;

    beforeEach(() => {
        mockBucket = {
            leak: jest.fn(),
            isFull: jest.fn(),
            addToken: jest.fn(),
            getAvailableTokens: jest.fn()            
        } as unknown as jest.Mocked<LeakyBucket>;

        mockHolder = {            
                get: jest.fn().mockReturnValue(mockBucket),        
        } as unknown as jest.Mocked<BucketsHolder>;

        (BucketsHolder.getInstance) = () => mockHolder; 

        context = {
            state: { userid: 'user1' },
            response: { status: 200 },
        } as unknown as Koa.Context;

        next = jest.fn();
    });

    it('should allow the request if the bucket is not full', async () => {
        mockBucket.isFull.mockReturnValue(false);

        await leakyBucketMiddleware(context, next);

        expect(mockBucket.leak).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(mockBucket.addToken).not.toHaveBeenCalled();
    });

    it('should block the request if the bucket is full', async () => {
        mockBucket.isFull.mockReturnValue(true);

        await leakyBucketMiddleware(context, next);

        expect(mockBucket.leak).toHaveBeenCalled();
        expect(context.status).toBe(429);
        expect(next).not.toHaveBeenCalled();
    });

    it('should add a token if the request fails', async () => {
        mockBucket.isFull.mockReturnValue(false);
        context.response.status = 500;

        await leakyBucketMiddleware(context, next);

        expect(mockBucket.leak).toHaveBeenCalled();
        expect(mockBucket.addToken).toHaveBeenCalled();
    });
});