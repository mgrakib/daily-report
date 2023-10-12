const {Schema, model} = require('mongoose')

const reportSchema = new Schema({}, { strict: false });

const ReportSchema = model("ReportSchema", reportSchema);
module.exports = ReportSchema

