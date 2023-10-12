/** @format */
const { format } = require("date-fns");
const Users = require("../models/user"); //model
const UserPreviousWorkStationHistory = require("../models/user-previouse-worstation-history"); //model

const { updateReportDocument } = require("./reportService"); //report service

const findUser = (key, value) => {
	if (key === "_id") {
		return Users.findById(vlaue);
	}
	return Users.findOne({ [key]: value });
};

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

const transferUserService = async (userServiceID, newStationName) => {
	const user = await findUser("userServiceID", userServiceID);

	await updateReportDocument(
		userServiceID,
		newStationName,
		(currentStation = user?.currentWorkStation)
	);
	
	const updateWorkStationHistory =
		await UserPreviousWorkStationHistory.findOneAndUpdate(
			{
				userID: user._id,
			},
			{
				$push: {
					workStationHistory: {
						stationName: newStationName,
						joiningDate: format(new Date(), "yyyy-MM-dd"),
						transferDate: format(new Date(), "yyyy-MM-dd"),
					},
				},
			},
			{
				new: true,
				upsert: true,
			}
		);

	const userUpdate = await Users.findOneAndUpdate(
		{ userServiceID },
		{
			currentWorkStation: newStationName,
			userJoiningDate: format(new Date(), "yyyy-MM-dd"),
			lastTransferDate: format(new Date(), "yyyy-MM-dd"),
		}
	);
	return userUpdate;
};

module.exports = {
	findUser,
	createNewUser,
	transferUserService,
};
