import Router from '@koa/router';
import { loginPost } from './endpoints/auth/login';
import leakyBucketMiddleware from './middlewares/leakyBucketMiddleware';
import { Context } from 'koa';
import authorizationMiddleware from './middlewares/authorizationMiddleware';

const router = new Router();


router.get('/', authorizationMiddleware, leakyBucketMiddleware, async (ctx: Context) => {

    ctx.body = 'Hello World';

});

router.post('/auth/login', loginPost);

export default router;  