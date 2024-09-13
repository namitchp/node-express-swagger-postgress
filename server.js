import APP from 'express';
import Utils from './app/utils';
import Config from './config';
import routes from './routes';
import { httpConstants } from './app/common/constants';
import sequelize from './config/dbConnection';
const modle = require("./app/models");
const app = new APP();
require('./config/express')(app);
class Server {
  static listen() {
    // console.log(modle)
    // Promise.all([sequelize.authenticate()])
    //   .then(async () => {
          // await modle.sequelize.sync({ alter: true });
        //   modle.sequelize.sync({force:true}).then((req) => {
        //     // console.log(req);
        // });
        console.log('Connection has been established successfully.');
        app.listen(Config.PORT, async () => {
          // await modle.sequelize.sync();
          // await modle.sequelize.sync({force:true});
          console.log(`UI available at http://localhost:${Config.PORT}/ui`);
          routes(app);
// console.log(db)
        });
      // })
      // .catch((error) =>
      //   console.log(
      //     'listen',
      //     'failed to connect',
      //     { err: error },
      //     'Nor-Desk',
      //     httpConstants.LOG_LEVEL_TYPE.ERROR
      //   )
      // );
  }
}
Server.listen();
