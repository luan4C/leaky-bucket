import { LeakyBucket } from '../models/bucket/bucket';

describe('LeakyBucket', () => {
    let bucket: LeakyBucket;

    beforeEach(() => {
        bucket = new LeakyBucket(10, 1);
    });

    it('should add tokens to the bucket', () => {
        expect(bucket.addToken()).toBe(true);
        expect(bucket.getAvailableTokens()).toBe(1);
    });

    it('should not add tokens if the bucket is full', () => {
        for (let i = 0; i < 10; i++) {
            bucket.addToken();
        }
        expect(bucket.addToken()).toBe(false);
        expect(bucket.getAvailableTokens()).toBe(10);
    });

    it('should leak tokens over time', () => {
        bucket.addToken();
        jest.spyOn(global.Date, 'now').mockReturnValue(Date.now() + 3600000); // Advance time by 1 hour
        bucket.leak();
        expect(bucket.getAvailableTokens()).toBe(0);
    });

    it('should not leak tokens below 0', () => {
        bucket.leak();
        expect(bucket.getAvailableTokens()).toBe(0);
    });
});