import Koa from 'koa';
import leakyBucketMiddleware from './middlewares/leakyBucketMiddleware';
import router from './router';
import json from 'koa-json';
const app = new Koa();

app.use(json());

app.use(router.routes()).use(router.allowedMethods());
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});