'use strict';

const http = require('http');
const axios = require('axios');

const startHttpServer = (port)=>{
  return new Promise((resolve, reject)=>{
    let server = http.createServer(app).listen(port, ()=>{
      console.error("###################### Express App Connected ##################", app.get('port'), app.get('env'));
      resolve(server);
    })
  })
}

exports.startHttpServer = startHttpServer;