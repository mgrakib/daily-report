/** @format */
const bcrypt = require("bcrypt");
const Users = require("../models/user");
const { findUser, createNewUser } = require("./userService");
const error = require("../utils/error");
const createUserService = async body => {
	const {
		userEmail,
		userGender,
		userJoiningDate,
		userName,
		userImage,
		userServiceID,
		password,
	} = body;

	const salt = bcrypt.genSaltSync(10);
	const userPassword = bcrypt.hashSync(password, salt);

	const isuser = await findUser("userEmail", userEmail);
	const isuser2 = await findUser("userServiceID", userServiceID);

	if (isuser || isuser2) {
		throw error("User Already Exist", 400);
	}

	const newUser = await createNewUser(
		userEmail,
		userGender,
		userJoiningDate,
		userName,
		userServiceID,
		userImage,
		userPassword
	);

	return newUser;
};

module.exports = {
	createUserService,
};
