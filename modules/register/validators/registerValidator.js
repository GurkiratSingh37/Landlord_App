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
    name          : Joi.string().trim().required(),
    username      : Joi.string().trim().required(),
    email         : Joi.string().trim().required(),
    password      : Joi.string().trim().required(),
    country_code  : Joi.string().trim().required(),
    phone_number  : Joi.number().strict().required()
  });
  
  const reqBody = {...req.body};
  const request = {...req, headers: req.headers};

  const validField = await joiValdiator.validateFields(req.apiReference, res, reqBody, request, schema, headerSchema);
  if(validField){
    next();
  }
}

exports.register = register;