const { Schema, model } = require('mongoose')


const active_lockupSchema = new Schema({}, { strict: false })


const Active_LockupSchema = model("Active_LockupSchema", active_lockupSchema);

module.exports = Active_LockupSchema;