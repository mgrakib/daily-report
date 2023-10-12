/** @format */

const ReportSchema = require("../models/reports");
const { updateEntryRelease, getWorkStationOpe, updateActiveLockup } = require("../services/reportService");
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

module.exports = {
	updateReport,
	getOpeList,
};
