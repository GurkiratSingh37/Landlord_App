'use strict';

const responseConstants = require('./responseConstants');

const tokenExpired = async(res, data, message)=>{
  const response = {
    status: responseConstants.status.SESSION_EXPIRED,
    message: message || responseConstants.messages.SESSION_EXPIRED,
    data: data || {}
  };
  this.sendResponse(res, response);
}

const parameterMissingResponse = async(res, err, data)=>{
  const response = {
    status: responseConstants.status.BAD_REQUEST,
    message: err || responseConstants.messages.PARAMETER_MISSING,
    data: data || {}
  };
  this.sendResponse(res, response);
}

const success = async(res, data, message)=>{
  const response = {
    data: data || {},
    status: responseConstants.messages.SUCCESS,
    message: message || responseConstants.status.SUCCESS
  }
  this.sendResponse(res, response);
}

const sendResponse = (res, data)=>{
  res.status(data.status).send(data);
}

const failure = async(res, data, message)=>{
  const response = {
    data: data || {},
    status: responseConstants.status.UNAUTHORIZED,
    message: message || responseConstants.messages.FAILURE
  }
  this.sendResponse(res, response);
}

const responses = async(res, data)=>{
  let response = JSON.stringify({
    message: data.message,
    status: data.status,
    data: data.data
  });

  res.status(data.status).send(response);
}

const internalServerError = async(res, data, message)=>{
  const response = {
    data: data || {},
    status: responseConstants.messages.INTERNAL_SERVER_ERROR,
    message: message || responseConstants.status.INTERNAL_SERVER_ERROR
  }
  this.sendResponse(res, response);
}

exports.sendResponse              = sendResponse;
exports.tokenExpired              = tokenExpired;
exports.responses                 = responses;
exports.parameterMissingResponse  = parameterMissingResponse;
exports.internalServerError       = internalServerError;
exports.success                   = success;
exports.failure                   = failure;