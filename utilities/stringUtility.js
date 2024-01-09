"use strict";

const numericCharacters           = '0123456789';
const numericCharactersLen        = numericCharacters.length;
const alfaNumericCharacters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const alfaNumericCharactersLen    = alfaNumericCharacters.length;

exports.getRandom = function(length, isNumeric){
  let result = '',
    len = isNumeric ? numericCharactersLen : alfaNumericCharactersLen,
    charSet = isNumeric ? numericCharacters : alfaNumericCharacters;

for (let i = 0; i < length; i++) {
  result += charSet.charAt(Math.floor(Math.random() * len));
}
return result;
}