'use strict';

const mysqllib      = require('./mysqllib');
const dbProperties  = require('./dbProperties');
const redislib    = require('./redislib');

const initialize = async(apiReference)=>{
  global.mysqlCon   = await mysqllib.initialize(apiReference, dbProperties.mysql.master);
  global.myredisCon = await redislib.initialize(apiReference, dbProperties.redis);
}

exports.initialize = initialize;