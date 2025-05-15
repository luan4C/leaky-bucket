import { bodyParser } from '@koa/bodyparser';
import Koa from 'koa';
import json from 'koa-json';
import router from './router';
const app = new Koa();

app.use(json());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});