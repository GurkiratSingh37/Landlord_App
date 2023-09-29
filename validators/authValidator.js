'use strict';

const logging = require('../logging/logging');
const jwtService = require('../services/jwtServce');
const responses = require('../responses/responses');

exports.authenticateUser = async(res, req, next)=>{
  let apiReference = req.apiReference;
  let cache = {...res.locals};
  logging.log(apiReference, {EVENT: "Locals Values :===: in Authenticate User", Data: cache});

  if(cache.bypass_user_auth){
    res.locals.auth_details = {
      user_id: req.body.user_id
    }
    next();
  }

  await validations(req, res, next);
}

const validations = async(req, res, next)=>{

  let requestHeaders = {...req.headers};

  let decodedToken = await jwtService.verifyJwt(req.apiReference, requestHeaders["access-token"]);

  if(!decodedToken){
    return responses.invalidAuthKey(res);
  }
}