/** @format */

const { format } = require("date-fns");
const ReportModel = require("../models/reports");
const updateReportDocument = async (
	userServiceID,
	newStationName,
	currentStation
) => {
	const key = `${userServiceID}|${currentStation}`;
	const newKey = `${userServiceID}|${newStationName}`;

	const userPreviousHistory = await ReportModel.findOne({
		[key]: { $exists: true },
	});

	if (!userPreviousHistory) {
		const reportData = new ReportModel({
			[newKey]: {
				[format(new Date(), "yyyy-MM-dd")]: {
					entry: 0,
					release: 0,
				},
			},
		});
		await reportData.save();
	} else {
		await ReportModel.updateMany({}, { $rename: { [key]: newKey } });
	}
};

const updateEntryRelease = async data => {
	const newDate = format(new Date(), "yyyy-MM-dd");

	const bulkOperations = [];

	for (const { userServiceID, entry, release } of data) {
		const exists = await ReportModel.exists({
			[userServiceID]: { $exists: true },
		});

		if (exists) {
			bulkOperations.push({
				updateOne: {
					filter: { [userServiceID]: { $exists: true } },
					update: {
						$set: {
							[`${userServiceID}.${newDate}`]: { entry, release },
						},
					},
					upsert: true,
				},
			});
		}
	}
	await ReportModel.bulkWrite(bulkOperations);
};


module.exports = {
	updateReportDocument,
	updateEntryRelease,
};
