/** @format */

const ReportSchema = require("../models/reports");
const { updateEntryRelease } = require("../services/reportService");

const updateReport = async (req, res, next) => {
	
	try {
		const body = req.body;
		const value = await updateEntryRelease(body);

		res.status(200).json({ message: "all okay", value });
	} catch (e) {
		next(e)
	}
};

module.exports = {
	updateReport,
};
