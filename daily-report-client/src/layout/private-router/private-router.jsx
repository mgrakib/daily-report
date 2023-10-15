/** @format */

import { onAuthStateChanged } from "firebase/auth";
import React, { Children, useEffect, useState } from "react";
import auth from "../../firebase.config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { useGetSingleUserQuery } from "../../redux/createApi/createApi";
import { setUser, toggleIsLoading } from "../../redux/features/user-slice/user-slice";
import GlobalLoading from "../../Shared/global-loading/global-loading";
import LoadingDataFetch from "../../Shared/loading-data-fetch/loading-data-fetch";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
	const { pathname } = useLocation();
	const { role, isLoading, email } = useSelector(state => state.userSlice);
	const dispatch = useDispatch();
	const [userEmail, setUserEmail] = useState("");
	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setUserEmail(user.email);
			} else {
				dispatch(toggleIsLoading(false));
			}
		});
	}, [dispatch]);

	const { data: userInfo } = useGetSingleUserQuery({
		key: "userEmail",
		value: userEmail,
	});



	
    useEffect(() => {
		userInfo?.user &&
			dispatch(
				setUser({
					workStationName: userInfo?.user?.currentWorkStation,
					userServiceID: userInfo?.user?.userServiceID,
					email: userInfo?.user?.userEmail,
					name: userInfo?.user?.userName,
					role: userInfo?.user?.role,
					isLoading: false,
				})
			);
	}, [userInfo, dispatch]);
	if (isLoading) {
		return <LoadingDataFetch  isOpen/>
	}
		if (!isLoading && !email) {
			return (
				<Navigate
					to='/'
					state={{ path: pathname }}
				/>
			);
		} else {
			return <div>{children}</div>;
		}
};

export default PrivateRouter;
