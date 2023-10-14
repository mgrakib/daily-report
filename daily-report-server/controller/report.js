/** @format */

const ReportSchema = require("../models/reports");

const { updateEntryRelease, getWorkStationOpe, updateActiveLockup, getActiveLockupEntryRelease } = require("../services/reportService");
const { getUsersArray } = require("../services/userService");

const updateReport = async (req, res, next) => {
	
	try {
		const body = req.body;
		const newArray = [...body]
		const updateLockupActive = await updateActiveLockup(newArray.pop());		
		const value = await updateEntryRelease(body);

		res.status(200).json({ message: "all okay", value });
	} catch (e) {
		next(e)
	}
};

const getOpeList = async (req, res, next) => {
	const stationName = req?.query?.s_n
	try {
		const userServiceIDArr = await getWorkStationOpe(stationName);
		const usersList = await getUsersArray(userServiceIDArr);

		res.status(200).json({ usersList });
	} catch (e) {
		next(e)
	}
}


const getActiveLockupEntryReleaseController = async (req, res, next) => {
	try {
		const stationName = req.query.s_n
		const reportDate = req.query.r_d;
		const userServiceID = req.query.u_i

		console.log(
			reportDate,
			" data",
			stationName,
			" stai",
			userServiceID,
			" id",
			" paramcs"
		);
		
		const updateInfo = await getActiveLockupEntryRelease(
			stationName,
			reportDate,
			userServiceID
		);

		
		res.status(200).json(updateInfo);
	} catch (e) {
		next(e)
	}
}



module.exports = {
	updateReport,
	getOpeList,
	getActiveLockupEntryReleaseController,
};
