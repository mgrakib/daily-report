/** @format */

const { model, Schema } = require("mongoose");

const workStationOpeSchema = new Schema({}, { strict: false });

const WorkStationOpeSchema = model("WorkStationSchema", workStationOpeSchema);
module.exports = WorkStationOpeSchema;
