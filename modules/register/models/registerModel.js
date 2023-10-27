"use strict";

const mongoose  = require("mongoose");
const Schema    = mongoose.Schema;

const registerSchema = new Schema(
  {
    name: {
      type      : String,
      required  : true
    },
    username: {
      type      : String,
      required  : true
    },
    email: {
      type      : String,
      required  : true
    },
    password: {
      type      : String,
      required  : true
    },
    country_code: {
      type      : Number,
      required  : true
    },
    phone_number: {
      type      : Number,
      required  : true
    },
    otp_code: {
      type      : Number,
      required  : false,
      default   : null
    },
    otp_send_at: {
      type      : Date,
      required  : false,
      default   : null
    },
    is_active   : {
      type      : Number,
      required  : true,
      default   : 1
    },
    // is_registration_completed : {
    //   type      : Number,
    //   required  : true
    // },
    is_deleted  : {
      type      : Number,
      required  : true,
      default   : 0
    }
  },
  {
    timestamps  : true,
    toJSON      : {virtuals: true},
    toObject    : {virtuals: true},
  }
)

registerSchema.index({email: 1, phone_number: 1}, {unique: true}); // to make email and phoneNumber unique

const registerModel = mongoose.model("register", registerSchema);
module.exports = registerModel;
// module.exports.registerModel = mongoose.model("register", registerSchema);