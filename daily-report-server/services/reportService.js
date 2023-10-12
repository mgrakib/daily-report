/** @format */

const { format } = require("date-fns");
const ReportModel = require("../models/reports");
const WorkStationOpeSchema = require("../models/workstation-info");
const Active_LockupSchema = require("../models/activeLockup");

const updateReportDocument = async (
	userServiceID,
	newStationName,
	currentStation
) => {
	const key = `${userServiceID}|${currentStation}`;
	const newKey = `${userServiceID}|${newStationName}`;

	const jailWarderHistory = await ReportModel.findOne({
		[`jailWarder|${newStationName}`]: { $exists: true },
	});


	if (!jailWarderHistory && newStationName !=="NTMC") {
		// add jailWarder
		const reportData = new ReportModel({
			[`jailWarder|${newStationName}`]: {
				[format(new Date(), "yyyy-MM-dd")]: {
					entry: 0,
					release: 0,
				},
			},
		});
		await reportData.save();
	}

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

const getWorkStationOpe = async stationName => {
	const stationInfo = await WorkStationOpeSchema.findOne({
		[stationName]: { $exists: true },
	});
	const userServiceIDArr = stationInfo[stationName];

	return userServiceIDArr;
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
							[`${userServiceID}.${newDate}`]: {
								entry: parseInt(entry),
								release: parseInt(release),
							},
						},
					},
					upsert: true,
				},
			});
		}
	}
	await ReportModel.bulkWrite(bulkOperations);
};

const updateActiveLockup = async data => {
	const { activePrison, lockupPrison, stationName } = data || {};
	const newDate = format(new Date(), "yyyy-MM-dd");
	const newValue = await Active_LockupSchema.updateOne(
		{ [stationName]: { $exists: true } },
		{
			$set: {
				[`${stationName}.${newDate}`]: {
					activePrison: parseInt(activePrison),
					lockupPrison: parseInt(lockupPrison),
				},
			},
		},
		{ upsert: true }
	);
}
module.exports = {
	updateReportDocument,
	updateEntryRelease,
	getWorkStationOpe,
	updateActiveLockup,
};
