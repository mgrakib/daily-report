/** @format */

const { Schema, model } = require("mongoose");

const userNameWithIDSchema = new Schema({}, {strict: false})

const UserNameWIthID = model("UserNameWIthID", userNameWithIDSchema);
module.exports = UserNameWIthID;