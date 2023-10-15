/** @format */

import { configureStore } from "@reduxjs/toolkit";
import navStateValueSlice  from "./features/nav-value-state/navValueSlice";
import { dailyReportAPI } from "./createApi/createApi";
import workStationList from "./features/work-station-list/work-station-list";
import userSlice from "./features/user-slice/user-slice";



export const store = configureStore({
	reducer: {
		navReducer: navStateValueSlice,
		userSlice,
		workStationList: workStationList,
		[dailyReportAPI.reducerPath]: dailyReportAPI.reducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(dailyReportAPI.middleware),
});
