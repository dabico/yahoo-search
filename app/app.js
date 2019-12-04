/** 
 *  @fileOverview File used to configure the express server
 *
 *  @author       Ozren Dabić <dabico@usi.ch>
 */

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const kleiDust = require('klei-dust');

const app = express();

app.use(logger('dev'));

app.set('view engine', 'dust');
app.set('views', './views');
app.engine('dust', kleiDust.dust);

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}))

const routers = require('./routes/routers');

app.use('/', routers.root);

module.exports = app;