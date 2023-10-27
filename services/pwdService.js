"use strict";

const bcrypt = require('bcrypt');

exports.encrpyt = (pwd)=>{
  return bcrypt.hashSync(pwd, 10);
}

exports.compare = (pwd, hash)=>{
  return bcrypt.compare(pwd, hash);
}