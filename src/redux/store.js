/** @format */

import { configureStore } from "@reduxjs/toolkit";
import navStateValueSlice  from "./features/nav-value-state/navValueSlice";

export const store = configureStore({
	reducer: {
		navReducer: navStateValueSlice
	},
});
