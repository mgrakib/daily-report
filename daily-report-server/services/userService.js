/** @format */
const { format } = require("date-fns");
const Users = require("../models/user"); //model
const UserNameWithID = require("../models/userNameWithID"); //model
const UserPreviousWorkStationHistory = require("../models/user-previouse-worstation-history"); //model

const { updateReportDocument } = require("./reportService"); //report service
const {
	updateWorkStationOpeInfoHistory,
} = require("./workstation-infoService");

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
	const saveUserNameWithID = new UserNameWithID({
		[userServiceID]: userName,
	});
	await saveUserNameWithID.save()
	return user;
};

const transferUserService = async (userServiceID, newStationName) => {
	const user = await findUser("userServiceID", userServiceID);

	await updateReportDocument(
		userServiceID,
		newStationName,
		(currentStation = user?.currentWorkStation)
	);

	await updateWorkStationOpeInfoHistory(
		userServiceID,
		newStationName,
		(currentStation = user?.currentWorkStation)
	);
	const updateWorkStationHistory =
		await UserPreviousWorkStationHistory.findOneAndUpdate(
			{
				userServiceID: user.userServiceID,
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
			profileStatus: `${
				newStationName !== "NTMC" ? "ACTIVE" : "DEPRECATED"
			}`,
		}
	);
	return userUpdate;
};

const getUsersArray = async userServiceIDArr => {
	const usersList = await Users.find({
		userServiceID: { $in: userServiceIDArr.map(id => id.toString()) },
	});
	return usersList;
};

module.exports = {
	findUser,
	createNewUser,
	transferUserService,
	getUsersArray,
};
