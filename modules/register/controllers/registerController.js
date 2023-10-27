"use strict";

const logging = require('../../../logging/logging');
const registerService = require('../services/registerService');
const responses = require('../../../responses/responses');

const register = async(req, res, next)=>{
  let apiReference = req.apiReference;
  let requestBody = {...req.body};
  try{
    const response = await registerService.register(apiReference, requestBody);
    logging.log(apiReference, {response: response});

    if(response.success){
      return responses.success(res, response.data);
    }
    
    return responses.failure(res, {}, response.error);
  }
  catch(err){
    logging.logError(apiReference, {EVENT: "Register Error", ERROR: err, STACK: err.stack});
    return responses.internalServerError(res);
  }
}

exports.register = register