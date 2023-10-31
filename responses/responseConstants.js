'use strict';

const status = {
  SUCCESS                 : 200,
  BAD_REQUEST             : 400,
  UNAUTHORIZED            : 401,
  NOT_FOUND               : 404,
  SESSION_EXPIRED         : 440,
  INTERNAL_SERVER_ERROR   : 500,
}

const messages = {
  SESSION_EXPIRED         : "Your session has been Expired. Login Again!",
  PARAMETER_MISSING       : "Insufficient information was supplied. Please check and try again.",
  INTERNAL_SERVER_ERROR   : "Some error occurred.",
  SUCCESS                 : "Success",
  FAILURE                 : "Failure",
  DUPLICATE               : "Duplicate value in database.",
  NOT_FOUND               : "No Data Found!",
  INVALID_CREDS           : "Invalid Credentials!",
}

const modules = {
  REGISTER        : "register",
  LOGIN           : "login",
}

exports.status    = status;
exports.messages  = messages;
exports.modules   = modules;