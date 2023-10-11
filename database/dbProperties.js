'use strict';

const config = require('config');

exports.mysql = {
  master: {
    host      : process.env.DB_HOST       || config.get('dbProperties.mysql.master.host'),
    username  : process.env.DB_USERNAME   || config.get('dbProperties.mysql.master.username'),
    password  : process.env.DB_PASSWORD   || config.get('dbProperties.mysql.master.password'),
    database  : process.env.DB_NAME       || config.get('dbProperties.mysql.master.database')
  }
};

exports.redis = {
  port        : config.get('dbProperties.redis.port'),
  host        : config.get('dbProperties.redis.host'),
  password    : config.get('dbProperties.redis.password'),
  prefix      : config.get('dbProperties.redis.prefix')
};

exports.mongodb = {
  host      : config.get('dbProperties.mongodb.host'),
  port      : config.get('dbProperties.mongodb.port'),
  username  : config.get('dbProperties.mongodb.username'),
  password  : config.get('dbProperties.mongodb.password'),
  database  : config.get('dbProperties.mongodb.database')
}