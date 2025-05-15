import Router from '@koa/router';
import { Context } from 'koa';
import { loginPost } from './endpoints/auth/login';
import authorizationMiddleware from './middlewares/authorizationMiddleware';
import leakyBucketMiddleware from './middlewares/leakyBucketMiddleware';

const router = new Router();


router.get('/', authorizationMiddleware, leakyBucketMiddleware, async (ctx: Context) => {

    ctx.body = 'Hello World';

});

router.post('/auth/login', loginPost);

export default router;  