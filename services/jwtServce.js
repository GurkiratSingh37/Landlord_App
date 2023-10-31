"use strict";

const jwt     = require('jsonwebtoken');
const secret  = "secret";
const logging = require('../logging/logging');

const payload = (opts)=>{
  const payloadResponse = {
    user_id       : opts.user_id,
    name          : opts.name,
    username      : opts.username,
    email         : opts.email,
    country_code  : opts.country_code,
    phone_number  : opts.phone_number
  }
  return payloadResponse;
}

exports.sign = async(apiReference, opts)=>{
  logging.log(apiReference, {EVENT: "Jwt Token Sign"});
  const token = jwt.sign(payload(opts), secret, {expiresIn: "5 days"});
  return token;
}

exports.verify = async(apiReference, token)=>{
  logging.log(apiReference, {EVENT: "Jwt Token Sign"});
  const verified = jwt.verify(token, secret);
  return verified;
}