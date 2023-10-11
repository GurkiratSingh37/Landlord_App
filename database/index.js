'use strict';

const mysqllib      = require('./mysqllib');
const dbProperties  = require('./dbProperties');
const redislib      = require('./redislib');
const mongolib      = require('./mongodblib');

const initialize = async(apiReference)=>{
  global.mysqlCon   = await mysqllib.initialize(apiReference, dbProperties.mysql.master);
  global.myredisCon = await redislib.initialize(apiReference, dbProperties.redis);
  global.mongolCon  = await mongolib.initialize(apiReference, dbProperties.mongodb);
}

exports.initialize = initialize;