"use strict";

const Mongoose  = require('mongoose');
const Schema    = Mongoose.Schema;

const tenantSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    adhaar_card   : {
      type: String,
      required: true
    },
    home_address  : {
      type: String,
      required: false
    },
    rent          : {
      type: Number,
      required: true
    },
    start_date    : {
      type: Date,
      required: true
    },
    total_people  : {
      type: Number,
      required: true
    },
  },
  {
    timestamps  : true,
    toJSON      : {virtuals: true},
    toObject    : {virtuals: true}
  }
)

// tenantSchema.index({});

const tenantModel = Mongoose.model("tenant", tenantSchema);
exports.tenantModel = tenantModel;