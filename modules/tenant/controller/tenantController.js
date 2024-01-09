"use strict";

const logging         = require('../../../logging/logging');
const tenantService   = require('../service/tenantService');
const responses       = require('../../../responses/responses');

exports.get = async(req, res)=>{
  let apiReference = req.apiReference;
  let requestBody = {...req.body};
  let cacheData = {...res.locals};
  try{
    requestBody.user_id = cacheData.auth_details.user_id;
    const response = await tenantService.get(apiReference, requestBody);
    logging.log(apiReference, {serviceResponse: response});

    if(response.success){
      return responses.success(res, response.data);
    }
    if(response.no_data_found){
      return responses.noDataFound(res);
    }

    return responses.failure(res, {}, response.error);
  }
  catch(err){
    logging.logError(apiReference, {EVENT: "Get Tenant ERROR", ERROR: err, STACK: err.stack});
    return responses.internalServerError(res);
  }
}

exports.getRandom = async(req, res)=>{
  let apiReference = req.apiReference;
  let requestBody = {...req.query};
  try{
    const response = await tenantService.getRandom(apiReference, requestBody);
    logging.log(apiReference, {serviceResponse: response});

    if(response.success){
      return responses.success(res, response.data);
    }
    if(response.no_data_found){
      return responses.noDataFound(res);
    }

    return responses.failure(res, {}, response.error);
  }
  catch(err){
    logging.logError(apiReference, {EVENT: "Get Fake ERROR", ERROR: err, STACK: err.stack});
    return responses.internalServerError(res);
  }
}


exports.create = async(req, res)=>{
  let apiReference = req.apiReference;
  let requestBody = {...req.body};
  let cacheData = {...res.locals};
  try{
    requestBody.user_id = cacheData.auth_details.user_id;
    const response = await tenantService.create(apiReference, requestBody);
    logging.log(apiReference, {serviceResponse: response});

    if(response.success){
      return responses.success(res, response.data);
    }

    return responses.failure(res, {}, response.error);
  }
  catch(err){
    logging.logError(apiReference, {EVENT: "Create Tenant ERROR", ERROR: err, STACK: err.stack});
    return responses.internalServerError(res);
  }
}

exports.update = async(req, res)=>{
  let apiReference = req.apiReference;
  let requestBody = {...req.body};
  let cacheData = {...res.locals};
  try{
    requestBody.user_id = cacheData.auth_details.user_id;
    const response = await tenantService.update(apiReference, requestBody);
    logging.log(apiReference, {serviceResponse: response});

    if(response.success){
      return responses.success(res, response.data);
    }
    if(response.no_data_found){
      return responses.noDataFound(res);
    }

    return responses.failure(res, {}, response.error);
  }
  catch(err){
    logging.logError(apiReference, {EVENT: "Update Tenant ERROR", ERROR: err, STACK: err.stack});
    return responses.internalServerError(res);
  }
}

exports.remove = async(req, res)=>{
  let apiReference = req.apiReference;
  let requestBody = {...req.body};
  let cacheData = {...res.locals};
  try{
    requestBody.user_id = cacheData.auth_details.user_id;
    const response = await tenantService.remove(apiReference, requestBody);
    logging.log(apiReference, {serviceResponse: response});

    if(response.success){
      return responses.success(res, response.data);
    }
    if(response.no_data_found){
      return responses.noDataFound(res);
    }

    return responses.failure(res, {}, response.error);
  }
  catch(err){
    logging.logError(apiReference, {EVENT: "Remove Tenant ERROR", ERROR: err, STACK: err.stack});
    return responses.internalServerError(res);
  }
}