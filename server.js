const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('database.json');
const middlewares = jsonServer.defaults();
 

server.use(middlewares);



server.get('/vinyls', (req, res) => {
  const db = router.db; // Access the lowdb instance
  let vinyls = db.get('vinyls').filter({ userId: parseInt(req.query.userId) }).value();

  // Check for _expand parameters in the query
  if (req.query._expand) {
    const expandParams = Array.isArray(req.query._expand) ? req.query._expand : [req.query._expand];

    vinyls = vinyls.map(vinyl => {
      expandParams.forEach(expand => {
        if (expand === 'user' && vinyl.userId) {
          vinyl.user = db.get('users').find({ id: vinyl.userId }).value();
        }
        if (expand === 'genre' && vinyl.genreId) {
          vinyl.genre = db.get('genres').find({ id: vinyl.genreId }).value();
        }
        if (expand === 'condition' && vinyl.conditionId) {
          vinyl.condition = db.get('conditions').find({ id: vinyl.conditionId }).value();
        }
      });
      return vinyl;
    });
  }

  res.json(vinyls);
});

server.use(router);



const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('JSON Server is running on port:', port);
});
