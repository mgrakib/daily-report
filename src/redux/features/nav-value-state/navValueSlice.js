/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: false,
	activeNav: "CREATE NEW USER",
};
export const navStateValueSlice = createSlice({
	name: "navStateValue",
	initialState,
	reducers: {
        changeNavState: (state, {payload}) => {
            
				(state.value = payload.value),
				(state.activeNav = payload.activeNav);
		},
	},
});

export const { changeNavState } = navStateValueSlice.actions;
export default navStateValueSlice.reducer;
