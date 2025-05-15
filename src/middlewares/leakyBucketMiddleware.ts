import Koa from 'koa';
import bucketsHolder from '../models/bucket/bucketsHolder';



export default async function leakyBucketMiddleware(context: Koa.Context, next: Koa.Next) {
    if(!context.state.userid) {
        context.status = 401;
        context.body = 'User ID not found in context state';
        return;
    }

    const holder  = bucketsHolder.getInstance()
    const bucket = holder.get(context.state.userid);
    bucket?.leak();
    if (!bucket) {
        context.status = 500;
        context.body = 'Leaky bucket not found';
        return;
    }

    if (bucket.isFull()) {
        context.status = 429; 
        context.body = 'Rate limit exceeded';
        return;
    }
    
    await next();

    if (context.response.status < 200 || context.response.status > 299) {
        bucket.addToken();
    }    
    console.log(`${context.state.userid} Bucket:`, bucket);
    
}