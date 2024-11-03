const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('database.json');
const middlewares = jsonServer.defaults();
const rewriter = jsonServer.rewriter('routes.json'); 

server.use(middlewares);
server.use(rewriter);
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('JSON Server is running on port:', port);
});
