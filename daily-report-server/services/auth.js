/** @format */
const bcrypt = require("bcrypt");
const Users = require('../models/user')
const { findUser, createNewUser } = require('./userService')
const error = require('../utils/error')
const createUserService = async (body) => {

	const {
		userEmail,
		userGender,
		userJoiningDate,
		userName,
		userServiceID,
		password,
		
	} = body;



	
    const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(password, salt);
    
	const user = await  findUser("userEmail", userEmail);
	
	if (user) {
		throw error('User Already Exist', 400)
	}

	const newUser = await createNewUser(
		userEmail,
		userGender,
		userJoiningDate,
		userName,
		userServiceID,
		hashPassword,
		
	);
	
	return newUser
};

module.exports = {
	createUserService,
};
