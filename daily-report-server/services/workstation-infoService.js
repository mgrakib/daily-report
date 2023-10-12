/** @format */

const WorkStationOpeSchema = require("../models/workstation-info");
const updateWorkStationOpeInfoHistory = async (
	userServiceID,
	newStationName,
	currentStation
) => {
	const newValue = await WorkStationOpeSchema.updateOne(
		{ [newStationName]: { $exists: true } },
		{ $push: { [newStationName]: userServiceID } },
		{ upsert: true }
	);

	const removeId = await WorkStationOpeSchema.updateOne(
		{ [currentStation]: { $exists: true } },
		{ $pull: { [currentStation]: { $in: [userServiceID] } } }
	);
};

module.exports = {
	updateWorkStationOpeInfoHistory,
};
