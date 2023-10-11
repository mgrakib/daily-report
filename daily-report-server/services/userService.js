/** @format */
const Users = require('../models/user')


const findUser = (key, value) => {
    if (key === "_id") {
        return Users.findById(vlaue)
    }
    return Users.findOne({ [key]: value })
    
}


const createNewUser = async (
	userEmail,
	userGender,
	userJoiningDate,
	userName,
	userServiceID,
	hashPassword
) => {
	const user = new Users({
		userEmail,
		userGender,
		userJoiningDate,
		userName,
		userServiceID,
		password: hashPassword,
	});
	await user.save();

	return user;
};


module.exports = {
	findUser,
	createNewUser,
};