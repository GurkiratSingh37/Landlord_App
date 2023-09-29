'use strict';

const asyncRedis    = require('async-redis');
const config        = require('config');
const logging       = require('../logging/logging');
const dbProperties  = require('../database/dbProperties');

let PREFIX = dbProperties.redis.prefix;

const initialize = async(apiReference, opts)=>{
  const client = asyncRedis.createClient({
    host                : config.host,
    port                : config.port,
    password            : config.password,
    socket_keepalive    : true
  });
  
  client.on("error", (err)=>{
    console.log("REDIS ERROR OCCURRED", err);
  });
  PREFIX = opts.prefix;
  logging.log(apiReference, "REDIS CONNECTED !!!");
  return client;
}

const get = async(apiReference, key)=>{
  logging.log(apiReference, {EVENT: "GET VALUE FROM REDIS ", KEY: PREFIX+key});
  return await redisCon.get((PREFIX+key));
}

const set = async(apiReference, key, value)=>{
  logging.log(apiReference, {EVENT: "SET VALUE FROM REDIS ", KEY: PREFIX+key});
  return await redisCon.set((PREFIX+key), value);
}

const del = async(apiReference, key)=>{
  logging.log(apiReference, {EVENT: "DELETE VALUE FROM REDIS ", KEY: PREFIX+key});
  return await redisCon.del((PREFIX+key));
}

exports.initialize  = initialize;
exports.get         = get;
exports.set         = set;
exports.del         = del;