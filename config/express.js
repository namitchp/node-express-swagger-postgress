import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
const useragent = require('express-useragent');
const swagger = require('../helper/swaggerConfiger');
module.exports = function (app) {
  // swagger info

  // logs incoming requests with endpoint and response time
  app.use(morgan(':method :url :response-time'));
  app.use(useragent.express());
  // parse application/x-www-form-urlencoded

  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  app.use(bodyParser.json({ limit: '10mb' })); // Change the limit value as needed
  // parse application/json
  app.use(bodyParser.json());
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res.status(413).send('Request entity too large');
    } else {
      next();
    }
  });
  app.use('/ui', swagger.serve, swagger.setup);
  app.get('/api-docs', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger.doc);
  });
  // compression of data
  app.use(compression(9));
  app.use(cors());
};
