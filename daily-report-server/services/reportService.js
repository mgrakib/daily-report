/** @format */

const { format } = require("date-fns");
const ReportModel = require("../models/reports");
const WorkStationOpeSchema = require("../models/workstation-info");
const Active_LockupSchema = require("../models/activeLockup");
const ReportUpdateHistorySchema = require("../models/reportUpdateHistory");
const { findDocument } = require("./utils");

const updateReportDocument = async (
	userServiceID,
	newStationName,
	currentStation
) => {
	const key = `${userServiceID}|${currentStation}`;
	const newKey = `${userServiceID}|${newStationName}`;

	const jailWarderHistory = await ReportModel.findOne({
		[`jailWarder${newStationName.slice(0, 3)}|${newStationName}`]: {
			$exists: true,
		},
	});

	if (!jailWarderHistory && newStationName !== "NTMC") {
		// add jailWarder
		const reportData = new ReportModel({
			[`jailWarder${newStationName.slice(0, 3)}|${newStationName}`]: {
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
	const { activePrison, lockupPrison, stationName, authorId } = data || {};
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

	const updateHistory = await updateReportWriteHistory(
		stationName,
		authorId,
		newDate
	);
};


const getActiveLockupEntryRelease = async (
	stationName,
	reportDate,
	userServiceID
) => {
	const newDate = reportDate || format(new Date(), "yyyy-MM-dd");
	try {
		const documents = await ReportModel.find(); //find all data

		const result = {}; //empty object to content all arr to object

		documents.forEach(item => {
			// Check if the item has a key with the desired format
			const keys = Object.keys(item).filter(key => key.includes("|"));

			if (keys.length > 0) {
				// Copy the value of the key to the result object
				result[keys[0]] = item[keys[0]];
			}
		});

		const objArr = Object.keys(result).reduce((acc, cur) => {
			if (
				userServiceID
					? cur.startsWith(userServiceID)
					: stationName === "All"
					? true
					: cur.endsWith(stationName)
			) {
				Object.keys(result[cur]).forEach(dateKey => {
					if (newDate === dateKey) {
						acc[cur] = result[cur][dateKey];
					}
				});
			}
			return acc;
		}, {});

		console.log(objArr, " thi is alu");

		const activeLockup = await findDocument(
			Active_LockupSchema,
			stationName
		); //find active

		const activeObj = Object.keys(activeLockup)?.reduce((acc, cur) => {
			if (cur === stationName) {
				Object.keys(activeLockup[cur]).forEach(dateKey => {
					if (newDate === dateKey) {
						acc[cur] = activeLockup[cur][dateKey];
					}
				});
			}
			return acc;
		}, {});

		return {
			opeReport: objArr,
			activeLockup: activeObj,
			isTodaysUpdateDone:
				Object.keys(activeObj).length === 0 ? false : true,
		};
	} catch (error) {
		console.error("Error:", error);
	}
};

const updateReportWriteHistory = async (stationName, authorId, newDate) => {
	let existingRecord = await ReportUpdateHistorySchema.findOne({
		[stationName]: { $exists: true },
	});

	if (!existingRecord) {
		// If the record doesn't exist, create a new one
		existingRecord = new ReportUpdateHistorySchema();
		existingRecord[stationName] = {
			[newDate]: [
				{
					authorId,
					dateTime: new Date(),
				},
			],
		};
	} else if (!existingRecord[stationName][newDate]) {
		// If 'newDate' doesn't exist, create a new entry
		existingRecord[stationName][newDate] = [
			{
				authorId,
				dateTime: new Date(),
			},
		];
	} else {
		// If 'newDate' already exists, push a new object into the array
		existingRecord[stationName][newDate].push({
			authorId,
			dateTime: new Date(),
		});
	}

	// Update the existing record in the database
	const updatedRecord = await ReportUpdateHistorySchema.findOneAndUpdate(
		{ _id: existingRecord._id },
		existingRecord,
		{ new: true }
	);

	// The 'updatedRecord' now contains the latest changes

	// If you want to use the updated record, you can return it or perform further operations.
	return updatedRecord;
};

module.exports = {
	updateReportDocument,
	updateEntryRelease,
	getWorkStationOpe,
	updateActiveLockup,
	getActiveLockupEntryRelease,
	updateReportWriteHistory,
};
