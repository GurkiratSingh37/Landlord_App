"use strict";

const Joi = require('joi');
const responseConstants = require('../../../responses/responseConstants');
const joiValdiator = require('../../../validators/joiValidator');

const headerSchema = Joi.object().keys({});

const register = async(req, res, next)=>{
  req.apiReference = {
    module: responseConstants.modules.REGISTER,
    api: "register"
  }

  const schema = Joi.object().keys({
    name            : Joi.string().trim().required(),
    username        : Joi.string().trim().required(),
    email           : Joi.string().email().required(),
    password        : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{7,30}$')).required(),
    repeat_password : Joi.ref('password'),
    country_code    : Joi.string().trim().required(),
    phone_number    : Joi.number().strict().required()
  });
  
  const reqBody = {...req.body};
  const request = {...req, headers: req.headers};

  const validField = await joiValdiator.validateFields(req.apiReference, res, reqBody, request, schema, headerSchema);
  if(validField){
    next();
  }
}

exports.register = register;