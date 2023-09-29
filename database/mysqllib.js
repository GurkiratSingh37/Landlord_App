'use strict';

const mysql   = require('mysql2');
const logging = require('../logging/logging');

const initialize = async(apiReference, props)=>{
  let numConnectionsInPool = 0;
  const conn = mysql.createPool(props).promise();

  conn.on('connection', ()=>{
    numConnectionsInPool++;
    console.log('CONNECTION IN POOL : ', numConnectionsInPool);
  });

  conn.on('error', (err)=>{
    console.log('MYSQL_CONN_ERROR', err);
    return initialize(apiReference, props); 
  })

  logging.log(apiReference, "MYSQL CONNECTED");
  return conn;
}

const executeQuery = async(apiReference, event, query, params)=>{
  // Just for logs
  const sqlQuery = mysqlCon.format(query, params);
  
  try{
    const [sqlResult, buff] = await mysqlCon.query(query, params);
    logging.log(apiReference, { EVENT     : "Executing query " + event, QUERY: sqlQuery,
      SQL_RESULT: sqlResult, SQL_RESULT_LENGTH: sqlResult && sqlResult.length });
    
    return sqlResult;
  }
  catch(sqlError){
    logging.log(apiReference, {EVENT: "Error in executing while "+ event, SQL_ERROR: sqlError, QUERY: query});
    if(sqlError.code === "ER_LOCK_DEADLOCK" || sqlError.code === "ER_QUERY_INTERRUPTED"){
      setTimeout(executeQuery.bind(null, apiReference, event, query, params), 50);
    }
    else if(sqlError.code === "ER_DUP_ENTRY"){
      return{
        success: false,
        ERROR: "ER_DUP_ENTRY"
      }
    }
    else{
      return {success: false, ERROR: sqlError.message, QUERY: query, PARAMS: params, EVENT: event};
    }
  }
}

exports.initialize    = initialize;
exports.executeQuery  = executeQuery;