'use strict';

const logging = require('../logging/logging');
const jwtService = require('../services/jwtServce');
const responses = require('../responses/responses');
const redis = require('../database/redislib');

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

  // getting token from the headers
  let requestHeaders = {...req.headers};

  let decodedToken = await jwtService.verifyJwt(req.apiReference, requestHeaders["access-token"]);

  if(!decodedToken){
    return responses.invalidAuthKey(res);
  }

  if(requestHeaders["access-token"] != redis.get(req.apiReference, decodedToken.user_id)){
    return responses.tokenExpired(res);
  }

  res.locals.auth_details = decodedToken;
  return next();
}