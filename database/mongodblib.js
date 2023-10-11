"use strict";

const mongoose  = require('mongoose');
const logging   = require('../logging/logging');

const initialize = async(apiReference, opts)=>{
  let url = `mongodb+srv://${opts.username}:${opts.password}@${opts.host}`;
  
  url+=`/${opts.database}`;

  mongoose.set('strictQuery',true);
  mongoose.set('debug', true);

  try{
    const res = await mongoose.connect(url, {
      useUnifiedTopology  : true,
      useNewUrlParser     : true,
      autoIndex           : true
    }); 
    logging.log(apiReference, "MONGO DB CONNECTED @ "); 
    return res;
  }
  catch(err){
    console.error(err)
    logging.logError(apiReference, { EVENT: "MONGO_CONN_ERR", err,  URL: url });
    return err
  }
  
}

exports.initialize = initialize;