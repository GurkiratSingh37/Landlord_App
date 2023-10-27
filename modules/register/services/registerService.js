"use strict";

const logging           = require('../../../logging/logging');
const registerDao       = require('../dao/registerDao');
const responseConstants = require('../../../responses/responseConstants');
const pwdService        = require('../../../services/pwdService');

exports.register = async(apiReference, opts)=>{
  let response = {success: false};
  logging.log(apiReference, {EVENT: "Register Service", OPTS: opts});

  // check if the user is already registered ?

  // CHECK DUPLICATE PHONE NUMBER
  if(opts.phone_number){
    let obj = {
      country_code: opts.country_code,
      phone_number: opts.phone_number
    }
    const fetchDetails = await registerDao.fetchDetails(apiReference, obj);
    logging.log(apiReference, {EVENT: "Fetch Response", RESPONSE: fetchDetails});

    if(!fetchDetails.success){
      return fetchDetails;
    }

    if(!_.isEmpty(fetchDetails.data)){
      response.error = responseConstants.messages.DUPLICATE;
      return response;
    }
  }

  // CHECK DUPLICATE EMAIL
  if(opts.email){
    let obj = {
      email: opts.email
    }

    let fetchDetails = await registerDao.fetchDetails(apiReference, obj);
    logging.log(apiReference, {EVENT: "Fetch Response", RESPONSE: fetchDetails});

    if(!fetchDetails.success){
      return fetchDetails;
    }

    if(!_.isEmpty(fetchDetails.data)){
      response.error = responseConstants.messages.DUPLICATE;
      return response;
    }
  }

  // CHECK DUPLICATE USERNAME
  if(opts.username){
    let obj = {
      username: opts.username
    }

    let fetchDetails = await registerDao.fetchDetails(apiReference, obj);
    logging.log(apiReference, {EVENT: "Fetch Response", RESPONSE: fetchDetails});

    if(!fetchDetails.success){
      return fetchDetails;
    }

    if(!_.isEmpty(fetchDetails.data)){
      response.error = responseConstants.messages.DUPLICATE;
      return response;
    }
  }

  // Encrypting password
  const hashPassword = pwdService.encrpyt(opts.password);
  opts.password = hashPassword;

  let insertDetails = await registerDao.insert(apiReference, opts);
  logging.log(apiReference, {EVENT: "Insert Response", insertDetails});

  if(!insertDetails.success){
    return insertDetails;
  }

  response.success = true;
  return response;  
}