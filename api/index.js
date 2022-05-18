const apiRouter = require('express').Router();

const jwt = require("jsonwebtoken");
const { getUserByUserId } = require("../db");
const { JWT_SECRET } = process.env;


apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here
const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);


module.exports = apiRouter;
