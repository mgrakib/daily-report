const {Schema, model} = require('mongoose')


const reportUpdateHistorySchema = new Schema({}, {strict: false})


const ReportUpdateHistorySchema = model("reportUpdateHistorySchema", reportUpdateHistorySchema);
module.exports = ReportUpdateHistorySchema;