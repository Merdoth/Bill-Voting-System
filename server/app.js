import express from 'express';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import logger from 'morgan';
import path from 'path';
import colors from 'colors';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 8000;;

// database config
const configDB = require('./config/database');

// Set up the express app
const app = express();


let webpackConfig;
mongoose.Promise = global.Promise;

// Setup a default catch-all route that sends back a welcome message in JSON format.
if (process.env.NODE_ENV !== 'production') {
  if (process.env.NODE_ENV === 'test') {
    mongoose.connect(configDB.url_test);
  } else {
    mongoose.connect(configDB.url);
  }
} else {
  mongoose.connect(configDB.url_production);
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html')); 
});

app.listen(port, (err) => {
  if (err) {
    console.log(err, 'but stuff works'); //eslint-disable-line
  } else {
    console.log(`We are live on port ${port}...`.green); //eslint-disable-line
  }
});

module.exports = app;
