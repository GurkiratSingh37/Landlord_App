"use strict";

const mongoose      = require('mongoose');
const registerModel = require('../../register/models/registerModel');
const logging       = require('../../../logging/logging');

exports.fetchDetails = async(apiReference, opts)=>{
  let response = {success: false};
  logging.log(apiReference, {EVENT: "Login Fetch Details DAO", OPTS: opts});

  try{
    let queryResponse = await registerModel.find({
      $or: [
        {username: opts.userNameOrEmail},
        {email: opts.userNameOrEmail}
      ]
    });
    logging.log(apiReference, {queryResponse: queryResponse});

    response.success  = true;
    response.data     = queryResponse;
    return response;
  }
  catch(err){
    logging.logError(apiReference, {EVENT: "Fetch Details QUERY ERROR", ERRORL: err});
    if(err.code==11000){
      response.is_duplicate = true;
    }

    response.error = err;
    return response;
  }
}