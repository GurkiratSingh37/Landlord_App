"use strict";

const logging             = require('../../../logging/logging');
const tenantModel         = require('../models/tenantModel');
const dbHandler           = require('../../../database/mongodblib');
const responseConstants   = require('../../../responses/responseConstants');

exports.get = async(apiReference, opts)=>{
  let response = {success: false};
  logging.log(apiReference, {EVENT: "Fetch Details DAO", OPTS: opts});

  try{
    let queryResponse = await tenantModel.find(opts);
    logging.log(apiReference, {EVENT: "Fetch Details RESPONSE", RESPONSE: queryResponse});

    response.success  = true;
    response.data     = queryResponse;
    return response;
  }
  catch(err){
    logging.logError(apiReference, {EVENT: "Fetch Details Error", ERROR: err, STACK: err.stack});
    response.error = err;
    return response;
  }
}

exports.create = async(apiReference, opts)=>{
  let response = {success: false};
  logging.log(apiReference, {EVENT: "Create Details DAO", OPTS: opts});

  try{
    let queryResponse = await tenantModel.create(opts);
    logging.log(apiReference, {EVENT: "Insert Details RESPONSE", RESPONSE: queryResponse});

    response.success  = true;
    return response;
  }
  catch(err){
    if(err.code == 11000){
      response.is_duplicate = true;
    }
    response.error = err;
    return response;
  }
}