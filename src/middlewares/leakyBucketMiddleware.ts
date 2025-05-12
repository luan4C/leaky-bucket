import Koa from 'koa';
import bucketsHolder from '../models/bucketsHolder';

export default function leakyBucketMiddleware(context: Koa.Context, next: Koa.Next) {
    const holder  = bucketsHolder.getInstance()
    const bucket = holder.get(context.ip);
    holder.refillTokens();
    console.log('Bucket:', bucket);
    if (!bucket) {
        context.status = 500;
        context.body = 'Leaky bucket not found';
        return;
    }

    if (bucket.isFull()) {
        context.status = 429; // Too Many Requests
        context.body = 'Rate limit exceeded';
        return;
    }
    bucket.leak();
    return next();
}