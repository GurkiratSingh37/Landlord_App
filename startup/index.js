'use strict';

const logging         = require('../logging/logging');
const envProperties   = require('../properties/envProperties');
const httpService     = require('../services/httpService');
const database        = require('../database');

const apiReference = {
  module: "startup",
  api: "initialize"
}

const initializeServer = async()=>{
  try{
    logging.log(apiReference, {EVENT: "Startup"});

    const server = await httpService.startHttpServer(envProperties.port);
    await database.initialize(apiReference);
  }
  catch(err){
    logging.logError(apiReference, {EVENT: "initializeServer", ERROR: err});
    throw new Error(err);
  }
}

exports.initializeServer = initializeServer;