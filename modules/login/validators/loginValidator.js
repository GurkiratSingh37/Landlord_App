"use strict";

const Joi                 = require('joi');
const joiValidator        = require('../../../validators/joiValidator');
const responseConstants   = require('../../../responses/responseConstants');
const apiReferenceModule  = responseConstants.modules.LOGIN;

const headerSchema = Joi.object().keys({});

exports.loginWithPassword = async(req, res, next)=>{
  req.apiReference = {
    module  : apiReferenceModule,
    api     : "loginWithPassword"
  };

  const schema = Joi.object().keys({
    userNameOrEmail : Joi.alternatives().try(
      Joi.string().email(),
      Joi.string().alphanum().min(3).max(15)
    ),
    password        : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{7,30}$')).required()
  });

  const reqBody = {...req.body};  
  const request = {...req, headers: req.headers};

  const validFields = await joiValidator.validateFields(req.apiReference, res, reqBody, request, schema, headerSchema);
  if(validFields){
    next();
  }
}