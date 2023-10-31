"use strict";

const logging           = require('../../../logging/logging');
const loginDao          = require('../dao/loginDao');
const responseConstants = require('../../../responses/responseConstants');
const pwdService        = require('../../../services/pwdService');
const jwtService        = require('../../../services/jwtServce');

exports.loginWithPassword = async(apiReference, opts)=>{
  let response = {success: false};
  logging.log(apiReference, {EVENT: "Login With Password SERVICE", OPTS: opts});

  /** Check If User Exists by passing Email or Username */
  let fetchUserDetails = await loginDao.fetchDetails(apiReference, opts);
  logging.log(apiReference, {EVENT: "Fetch User DETAILS", RESPONSE: fetchUserDetails});

  if(!fetchUserDetails.success){
    return fetchUserDetails;
  }

  if(_.isEmpty(fetchUserDetails.data)){
    response.error = responseConstants.messages.NOT_FOUND;
    return response;
  }

  fetchUserDetails=fetchUserDetails.data[0]._doc;

  /** Check if Password provided matches */
  let checkPassword = pwdService.compare(opts.password, fetchUserDetails.password);
  logging.log(apiReference, {EVENT: "Check Password", RESPONSE: checkPassword});

  if(!checkPassword){
    response.error = responseConstants.messages.INVALID_CREDS;
    return response;
  }

  /** Create Jwt Token */
  const token = await jwtService.sign(apiReference, fetchUserDetails);
  logging.log(apiReference, {EVENT: "Get Token", TOKEN: token});
  fetchUserDetails.access_token=token;
  
  delete fetchUserDetails.password;
  delete fetchUserDetails.createdAt;
  delete fetchUserDetails.__v;
  delete fetchUserDetails.otp_code;
  delete fetchUserDetails.otp_send_at;

  response.success  = true;
  response.data     = {...fetchUserDetails};
  return response
}
