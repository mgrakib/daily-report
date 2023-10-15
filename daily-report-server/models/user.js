/** @format */

const { model, Schema } = require("mongoose");

const userSchema = new Schema({
	userName: {
		type: String,
		required: true,
	},
	userGender: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		enum: ["USER", "ADMIN"],
		default: "USER",
	},
	userEmail: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		required: true,
	},
	userServiceID: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	userJoiningDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
	lastTransferDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
	currentWorkStation: {
		type: String,
		required: true,
		default: "NTMC",
	},
	profileStatus: {
		type: String,
		required: true,
		enum: ["PENDING", "ACTIVE", "DEPRECATED"],
		default: "PENDING",
	},
});

const User = model("User", userSchema);

module.exports = User;
