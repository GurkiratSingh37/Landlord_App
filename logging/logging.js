'use strict';

const moment = require('moment');

let debugging_enabled = true; // for log & logError to run

const fileSwitch = {
  startup: true
}

const modules = {
  startup: {
    initialize: true
  }
}

const log = (apiReference, opts)=>{
  if(
    apiReference &&
    apiReference.module &&
    apiReference.api &&
    fileSwitch &&
    modules &&
    fileSwitch[apiReference.module] == true && 
    modules[apiReference.module] &&
    modules[apiReference.module][apiReference.api] == true &&
    debugging_enabled
    ){
      try{
        opts = JSON.stringify(opts);
      }
      catch(exception){
        console.log(">>> Exception <<<", exception)
      }
      console.log('-->', moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS') + ' :----: ', apiReference.module, ':==:', apiReference.api, ':==:', opts);
    }
}

const logError = (apiReference, opts)=>{
  if(
    apiReference &&
    apiReference.module &&
    apiReference.api &&
    debugging_enabled
    ){
      console.error();
    }
}

exports.log = log;
exports.logError = logError;