const routes = require('express').Router();


routes.get('/', (req, res) => {
    res.send('Hello World, This is home router');
  });

module.exports = routes;