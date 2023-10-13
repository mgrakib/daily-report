const {Schema, model} = require('mongoose')

const userPreviousWork_s_historySchema = new Schema({
	userServiceID: String,
	workStationHistory: [
		{
			stationName: {
				type: String,
				required: true,
			},
			joiningDate: {
				type: Date,
				default: new Date(),
				required: true,
			},
			transferDate: {
				type: Date,
				default: new Date(),
				required: true,
			},
		},
	],
});

const UserPreviousWorkStationHistory = model(
	"UserPreviousWorkStationHistory",
	userPreviousWork_s_historySchema
);

module.exports = UserPreviousWorkStationHistory;