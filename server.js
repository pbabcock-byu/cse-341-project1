const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = 3000;

// need to make sure bodyParser is installed npm i body-parser
// this will allow use to read the body of the requested object ! Dont forget to require it const bodyParser = require('body-parser');
app.use(bodyParser.json());
// there is no routes.js so it them looks at the dir routes for index.js
app.use('/', require('./routes'));


mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  }
  else {
    app.listen(process.env.port || port);
    console.log('Database is listening at port ' + (process.env.port || port));
  }
 });