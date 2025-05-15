import { type Context } from "koa";
import authService from "../../services/AuthService";


export const loginPost = async(ctx: Context) => { 
    
    const body = ctx.request.body as { username: string; password: string };
    
    if (!body.username || !body.password) {
        ctx.status = 400;
        ctx.body = { error: 'Username and password are required' };
    }

    const token = authService.autheticateUser(body.username, body.password);
    if(!token) {
        ctx.status = 401;
        ctx.body = { error: 'Invalid username or password' };
    }

    return ctx.body = { token };
}