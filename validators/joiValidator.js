"use strict";

const Joi       = require('joi');
const logging   = require('../logging/logging');
const responses = require('../responses/responses');

let headersStructure = Joi.object().keys({
  access_token: Joi.string().required()
})

const joiValidate = async(apiReference, body, schema, options, res, msg)=>{
  logging.log(apiReference, {EVENT: "validateFields", BODY: body});
  try{
    let validation = await schema.validateAsync(body, options);
    logging.log(apiReference, {"validationResp": validation});
    return true;
  }
  catch(err){
    logging.logError(apiReference, {"validation Error": err});
    responses.parameterMissingResponse(res, err.details[0].message);
    return false;
  }
};

const validateFields = async(apiReference, res, body, request, schema, headerSchema = headersStructure, msg)=>{
  const validateHeaders = await joiValidate(
    apiReference,
    {...request.headers},
    headerSchema,
    {allowUnknown: true},
    res,
    "Header parameter missing or parameter type is wrong."
  );

  return validateHeaders && await joiValidate(apiReference, body, schema, {allowUnknown: true}, res, msg);
};

exports.validateFields = validateFields;