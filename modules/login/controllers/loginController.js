"use strict";

const logging       = require('../../../logging/logging');
const loginService  = require('../services/loginService');
const responses     = require('../../../responses/responses');

exports.loginWithPassword = async(req, res)=>{
  let apiReference = req.apiReference;
  let requestBody = {...req.body};
  let cacheData = {...res.locals};
  try{

    const response = await loginService.loginWithPassword(apiReference, requestBody);
    logging.log(apiReference, {RESPONSE: response});

    if(response.success){
      return responses.success(res, response.data);
    }

    return responses.failure(res, {}, response.error);

  }
  catch(err){
    logging.logError(apiReference, {EVENT: "Login With Password ERROR", ERROR: err, STACK: err.stack});
    return responses.internalServerError(res);
  }
}