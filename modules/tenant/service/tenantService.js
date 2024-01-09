"use strict";

const logging             = require('../../../logging/logging');
const tenantDao           = require('../dao/tenantDao');
const responseConstants   = require('../../../responses/responseConstants');
const stringUtility       = require('../../../utilities/stringUtility');

exports.get = async(apiReference, opts)=>{
  let response = {success: false};
  logging.log(apiReference, {EVENT: "Get Tenant SERVICE", OPTS: opts});
  
  let fetchResponse = await tenantDao.get(apiReference, opts);
  logging.log(apiReference, {EVENT: "Fetch Tenant Details", RESPONSE: fetchResponse});

  if(!fetchResponse.success){
    return fetchResponse;
  }

  if(_.isEmpty(fetchResponse.data)){
    response.error = responseConstants.messages.NOT_FOUND;
    response.no_data_found = true;
    return response;
  }

  response.success = true;
  response.data = fetchResponse.data;
  return response;
}

exports.getRandom = async(apiReference, opts)=>{
  let response = {success: false};
  logging.log(apiReference, {EVENT: "Get Random SERVICE", OPTS: opts});
  
  let res=[]
  // random email
  for(let i=0;i<opts.loop;i++){
    let obj={};
    obj.email = "www.test"+stringUtility.getRandom(6,1)+"@gmail.com";
    obj.phone_number = stringUtility.getRandom(10,1);
    obj.username = "test"+stringUtility.getRandom(6,0);

    obj.country_code= "+91";
    obj.password="Admin@123";
    obj.name= "test Singh";
    obj.timezone= "Asia/Calcutta";
    obj.timezone_offset= 330;
    obj.lat= 15.23;
    obj.lng= 32.534;
    obj.account_type=2;

    res.push(obj);
  }

  response.success = true;
  response.data = res;
  return response;
}

exports.create = async(apiReference, opts)=>{
  let response = {success: false};
  logging.log(apiReference, {EVENT: "Create Tenant SERVICE", OPTS: opts});
  
  let insertDetails = await tenantDao.create(apiReference, opts);
  logging.log(apiReference, {EVENT: "Create Tenant RESPONSE", RESPONSE: insertDetails});

  if(!insertDetails.success){
    return insertDetails;
  }

  response.success = true;
  return response;
}

exports.update = async(apiReference, opts)=>{
  let response = {success: false};
  logging.log(apiReference, {EVENT: "Update Tenant SERVICE", OPTS: opts});

  let updateObj = {
    name          : opts.name,
    adhaar_card   : opts.adhaar_card,
    home_address  : opts.home_address,
    rent          : opts.rent,
    start_date    : opts.start_date,
    total_people  : opts.total_people,
  }
  
  let updateDetails = await tenantDao.update(apiReference, updateObj, {user_id: opts.user_id, tenant_id: opts.tenant_id});
  logging.log(apiReference, {EVENT: "Update Tenant RESPONSE", RESPONSE: updateDetails});

  if(!updateDetails.success){
    return updateDetails;
  }

  response.success = true;
  return response;
}

exports.remove = async(apiReference, opts)=>{
  let response = {success: false};
  logging.log(apiReference, {EVENT: "Remove Tenant SERVICE", OPTS: opts});

  let removeObj = {
    is_deleted: 1
  }
  
  let updateDetails = await tenantDao.remove(apiReference, removeObj, opts);
  logging.log(apiReference, {EVENT: "Remove Tenant RESPONSE", RESPONSE: updateDetails});

  if(!updateDetails.success){
    return updateDetails;
  }

  response.success = true;
  return response;
}