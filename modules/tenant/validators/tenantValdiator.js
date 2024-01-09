"use strict";

const Joi                 = require('joi');
const joiValdiator        = require('../../../validators/joiValidator');
const responseConstants   = require('../../../responses/responseConstants');
const apiReferenceModule  = responseConstants.modules.TENANT;

const headerSchema = Joi.object().keys({});

exports.get = async(req, res, next)=>{
  req.apiReference = {
    module  : apiReferenceModule,
    api     : "get"
  };

  const schema = Joi.object().keys({
    tenant_id : Joi.string().trim().optional(),
    limit     : Joi.number().strict().optional(),
    skip      : Joi.number().strict().optional()
  });

  const reqBody = {...req.query};
  const request = {...req, headers: req.headers};

  const validFields = await joiValdiator.validateFields(req.apiReference, res, reqBody, request, schema);
  if(validFields){
    next();
  }
}

exports.getRandom = async(req, res, next)=>{
  req.apiReference = {
    module  : apiReferenceModule,
    api     : "getRandom"
  };

  const schema = Joi.object().keys({
    loop: Joi.string().required()
  });

  const reqBody = {...req.query};
  const request = {...req, headers: req.headers};

  const validFields = await joiValdiator.validateFields(req.apiReference, res, reqBody, request, schema, headerSchema);
  if(validFields){
    next();
  }
}

exports.create = async(req, res, next)=>{
  req.apiReference = {
    module  : apiReferenceModule,
    api     : "create"
  };

  const schema = Joi.object().keys({
    name          : Joi.string().trim().required(),
    adhaar_card   : Joi.number().strict().optional(),
    home_address  : Joi.string().trim().optional(),
    rent          : Joi.string().trim().required(),
    start_date    : Joi.string().trim().required(),
    total_people  : Joi.number().strict().required(),
  });

  const reqBody = {...req.body};
  const request = {...req, headers: req.headers};

  const validFields = await joiValdiator.validateFields(req.apiReference, res, reqBody, request, schema);
  if(validFields){
    next();
  }
}

exports.update = async(req, res, next)=>{
  req.apiReference = {
    module  : apiReferenceModule,
    api     : "update"
  };

  const schema = Joi.object().keys({
    tenant_id     : Joi.number().strict().required(),

    name          : Joi.string().trim().optional(),
    adhaar_card   : Joi.number().strict().optional(),
    home_address  : Joi.string().trim().optional(),
    rent          : Joi.string().trim().optional(),
    start_date    : Joi.string().trim().optional(),
    total_people  : Joi.number().strict().optional(),
  });

  const reqBody = {...req.body};
  const request = {...req, headers: req.headers};

  const validFields = await joiValdiator.validateFields(req.apiReference, res, reqBody, request, schema);
  if(validFields){
    next();
  }
}

exports.remove = async(req, res, next)=>{
  req.apiReference = {
    module  : apiReferenceModule,
    api     : "remove"
  };

  const schema = Joi.object().keys({
    tenant_id     : Joi.number().strict().required()
  });

  const reqBody = {...req.body};
  const request = {...req, headers: req.headers};

  const validFields = await joiValdiator.validateFields(req.apiReference, res, reqBody, request, schema);
  if(validFields){
    next();
  }
}