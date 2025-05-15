import { Context, Next } from 'koa';
import { verifyToken } from '../utils/authUtils';

export default async function authorizationMiddleware(context: Context, next: Next) { 
    const authHeader = context.request.headers['authorization'];
    if (!authHeader) {
        context.status = 401; // Unauthorized
        context.body = 'Authorization header missing';
        return;
    }
    if(authHeader.split(' ')[0] !== 'Bearer'){
        context.status = 401; // Unauthorized
        context.body = 'Invalid Authorization header';    
        return;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        context.status = 401; // Unauthorized
        context.body = 'Token missing';
        return;
    }
    const tokenData = verifyToken(token);
    if(!tokenData){
        context.status = 401; // Unauthorized
        context.body = 'Invalid Token';
        return;
    }
    // Here you would typically verify the token and check its validity
    // For example, using a JWT library to decode and verify the token
    context.state.userid = tokenData.id;
    await next();

}