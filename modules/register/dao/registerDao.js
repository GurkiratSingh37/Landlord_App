"use strict";

const registerModel = require('../models/registerModel');

const logging = require('../../../logging/logging');

exports.insert = async(apiReference, opts)=>{
  let response = {success: false};
  logging.log(apiReference, {EVENT: "Insert Details", OPTS: opts});

  try{
    let queryResponse = await registerModel.create(opts);
    logging.log(apiReference, {queryResponse: queryResponse});

    response.success  = true;
    response.data     = queryResponse;
    return response;
  }
  catch(err){
    logging.logError(apiReference, {EVENT: "Insert ERROR", ERROR: err, STACK: err.stack});
    if (err.code == 11000) {
      response.is_duplicate = true;
    }
    response.error = err;
    return response;
  }
}

exports.fetchDetails = async(apiReference, opts)=>{
  let response = {success: false};
  logging.log(apiReference, {EVENT: "Fetch Register Details", OPTS: opts});

  let queryResponse;

  let matchQuery = {
    is_deleted: 0
  }

  let projection = {
    user_id: "$_id", // to rename the `_id` field to `user_id`
    username: 1,
    email: 1,
    password: 1,
    country_code: 1,
    phone_number: 1
  }

  if(opts.phone_number){
    matchQuery.country_code = opts.country_code;
    matchQuery.phone_number = opts.phone_number;
  }
  if(opts.email){
    matchQuery.email = opts.email;
  }
  if(opts.username){
    matchQuery.username = opts.username;
  }

  /**
  let queryResponse = await registerModel.findOne({
    email: opts.email
  });
  */

  try{
    queryResponse = await registerModel.aggregate([
      {
        $match: matchQuery
      },
      {
        $project: projection
      }
    ])
  }
  catch(err){
    logging.logError(apiReference, {EVENT: "Fetch Details Error", ERROR: err, STACK: err.stack});
    response.error = err;
    return response;
  }

  response.success = true;
  response.data = queryResponse;
  return response;
}