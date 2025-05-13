import Router from '@koa/router';

const router = new Router();


router.get('/', async (ctx) => {
    if(ctx.request.query.x === '1') {
        ctx.status = 400;
    }
    ctx.body = 'Hello World';
});

export default router;  