import Koa from 'koa';

const app = new Koa();

// Middleware to respond with "Hello World"
app.use(async (ctx) => {
    ctx.body = 'Hello World';
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});