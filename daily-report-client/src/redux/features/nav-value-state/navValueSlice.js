/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpen: false,
	activeNav: "",
};
export const navStateValueSlice = createSlice({
	name: "navStateValue",
	initialState,
	reducers: {
		changeNavState: (state, { payload }) => {
			(state.isOpen = payload.isOpen),
				(state.activeNav = payload.activeNav);
		},
	},
});

export const { changeNavState } = navStateValueSlice.actions;
export default navStateValueSlice.reducer;
