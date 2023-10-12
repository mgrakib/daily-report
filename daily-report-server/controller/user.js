/** @format */

const { findUser, transferUserService } = require("../services/userService");
const error = require("../utils/error");
const getSingleUser = async (req, res, next) => {
	try {
		const key = req.query.key;
		const value = req.query.value;
		const user = await findUser(key, value);
		res.status(200).json({ user });
	} catch (e) {
		next(e);
	}
};

const transferUser = async (req, res, next) => {
	try {
		const userServiceID = req.query.s_i;
		const newStationName = req.query.new_s;

		const userUpdate = await transferUserService(
			userServiceID,
			newStationName
		);
		if (!userUpdate) {
			const err = error("User not found", 400);
			throw err;
		}

		res.status(202).json({ userUpdate });
	} catch (e) {
		next(e);
	}
};



module.exports = {
	getSingleUser,
	transferUser,
};
