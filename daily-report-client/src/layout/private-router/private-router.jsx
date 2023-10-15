/** @format */

import { onAuthStateChanged } from "firebase/auth";
import React, { Children, useEffect, useState } from "react";
import auth from "../../firebase.config/firebase.config";
import { useDispatch } from "react-redux";
import { useGetSingleUserQuery } from "../../redux/createApi/createApi";
import { setUser } from "../../redux/features/user-slice/user-slice";

const PrivateRouter = ({ children }) => {
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


	console.log(userInfo, " from prive");

    useEffect(() => {
		userInfo &&
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
	return <div>{children}</div>;
};

export default PrivateRouter;
