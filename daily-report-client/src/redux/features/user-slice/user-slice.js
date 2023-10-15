/** @format */


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import auth from "../../../firebase.config/firebase.config";
const baseRoute = import.meta.env.VITE_BASE_URL;

export const createUser = createAsyncThunk(
	"userSlice/createUser",
	async ({
		...body
    }) => {
        
        
		const setInDB = await fetch(`${baseRoute}/u/create-user`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...body,
			}),
		});
		const res = await setInDB.json();

        const email = body?.userEmail 
        const password = body?.password
        const avatar = body?.userImage;
        const userName = body?.userName;

        console.log(body)

		if (res.message !== "user already exist") {
			const currentUserData = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			await updateProfile(auth.currentUser, {
				displayName: userName,
				photoURL: avatar,
			});

			return {
				email: currentUserData?.user?.email,
				name: currentUserData?.user?.displayName,
				role,
				workStationName,
				userServiceID,
			};
		} else {
			throw new Error("User already exists");
		}
	}
);


export const singIn = createAsyncThunk(
	"userSlice/singIn",
	async ({ email, password }) => {
		const data = await signInWithEmailAndPassword(auth, email, password);

		const result = await fetch(`${baseRoute}/get-user?email=${email}`);
		const userInfo = await result.json();

		return {
			name: userInfo.name,
			email: userInfo.email,
			busOperatorName: userInfo.busOperatorName,
			businessReg: userInfo.businessReg,
			role: userInfo.role,
		};
	}
);
const initialState = {
	name: "",
	email: "",
    role: "",
    workStationName: "",
    userServiceID:"",
	isLoading: true,
	isError: false,
	error: "",
};


const userStateSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.name = payload.name;
			state.email = payload.email;
			state.role = payload.role;
			state.workStationName = payload.workStationName;
			state.userServiceID = payload.userServiceID;
			state.isLoading = payload.isLoading;
		},
        logOut: state => {
			state.name = '';
			state.email = '';
			state.workStationName = '';
			state.userServiceID = '';
			state.role = '';
			state.isLoading = false;
		},

		toggleIsLoading: (state, { payload }) => {
			
			state.isLoading = payload
        },
        
		extraReducers: builder => {
			// Add reducers for additional action types here, and handle loading state as needed
			builder
				.addCase(createUser.pending, state => {
					state.name = "";
					state.email = "";
					state.role = "";
					state.isLoading = true;
					state.isError = false;
					state.error = "";
				})
				.addCase(createUser.fulfilled, (state, { payload }) => {
					state.name = payload.name;
					state.email = payload.email;
					state.role = payload.role;
					state.isLoading = false;
					state.isError = false;
					state.error = "";
				})
				.addCase(createUser.rejected, (state, actions) => {
					state.name = "";
					state.email = "";
					state.role = "";
					state.isLoading = false;
					state.isError = true;
					state.error = actions.error.message;
				})
				.addCase(singIn.pending, state => {
					state.name = "";
					state.email = "";
					state.role = "";
					state.isLoading = true;
					state.isError = false;
					state.error = "";
				})
				.addCase(singIn.fulfilled, (state, { payload }) => {
					state.name = payload.name;
					state.email = payload.email;
					state.role = payload.role;
					state.isLoading = false;
					state.isError = false;
					state.error = "";
				})
				.addCase(singIn.rejected, (state, actions) => {
					state.name = "";
					state.email = "";
					state.role = "";
					state.isLoading = false;
					state.isError = true;
					state.error = actions.error.message;
				});
		},
	},
});

export const { setUser, logOut, toggleIsLoading } = userStateSlice.actions;
export default userStateSlice.reducer;
