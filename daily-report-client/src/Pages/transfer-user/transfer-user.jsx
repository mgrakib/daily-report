/** @format */

import { useDispatch, useSelector } from "react-redux";
import useChangeNavStatus from "../../hooks/useChangeNavStatus/useChangeNavStatus";
import { changeNavState } from "../../redux/features/nav-value-state/navValueSlice";

import { useForm } from "react-hook-form";

import { Button, Checkbox, Radio, Tooltip } from "@mui/material";
import { useState } from "react";
import {
	useCreateNewUserMutation,
	useGetSingleUserQuery,
} from "../../redux/createApi/createApi";
import GlobalLoading from "../../Shared/global-loading/global-loading";
const TransferUser = () => {
	const [userServiceID, setUserServiceID] = useState(null);

	//change automatically nav name and state
	const dispatch = useDispatch();
	useChangeNavStatus(dispatch, changeNavState, true, "TRANSFER USER");

	const [selectedGender, setSelectedGender] = useState("male");
	const handleChange = event => {
		setSelectedGender(event.target.value);
	};

	const [createUser, { data: createdUser, isLoading: createUserIsLoading }] =
		useCreateNewUserMutation();
	const { isOpen, stationsName } = useSelector(
		state => state.workStationList
	); 


	console.log(isOpen, stationsName);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = data => {
		const userInfo = {
			...data,
			userGender: selectedGender,
		};

		createUser(userInfo);
	};

	const { data: singleUser, isLoading } = useGetSingleUserQuery({
		key: "userServiceID",
		value: watch("userServiceID"),
	});

	
	const { userEmail, userName, currentWorkStation } = singleUser?.user || {};

	const label = { inputProps: { "aria-label": "Checkbox demo" } };
	return (
		<div
			style={{
				backgroundImage:
					"url(https://i.ibb.co/SVRN9jZ/technology.webp)",
				backgroundSize: "cover",
			}}
			className='text-dark-common-color h-full '
		>
			<div className='w-full h-full bg-[#000000eb]  p-10 '>
				<div className='shadow-[0_0_20px_10px_#ffffff01] p-5 rounded-md bg-[#8a8a8a22] max-w-2xl mx-auto'>
					<h3 className='text-2xl font-semibold '>Transfer User_</h3>

					<form
						className='font-light mt-7 '
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className='grid grid-cols-2 gap-x-10 gap-y-7'>
							{/* user service id  */}
							<div>
								<div>
									<label htmlFor=''>Service ID_</label>
								</div>
								<input
									className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold'
									{...register("userServiceID", {
										required: true,
									})}
									value={userServiceID}
									aria-invalid={
										errors.userServiceID ? "true" : "false"
									}
								/>
								{errors.userServiceID?.type === "required" && (
									<p
										role='alert'
										className='text-[12px] text-red-500'
									>
										Service Id is required
									</p>
								)}
							</div>

							{/* user Full name  */}
							<div>
								<div>
									<label htmlFor=''>Full Name_</label>
								</div>
								<Tooltip
									title="You can't modify this field"
									disableFocusListener
								>
									<input
										value={userName}
										
										disabled
										className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold cursor-not-allowed'
										{...register("userName", {
											required: true,
										})}
										aria-invalid={
											errors.userName ? "true" : "false"
										}
									/>
								</Tooltip>
								{errors.userName?.type === "required" && (
									<p
										role='alert'
										className='text-[12px] text-red-500'
									>
										User name is required
									</p>
								)}
							</div>

							{/* user Email  */}
							<div>
								<div>
									<label htmlFor=''>Email_</label>
								</div>
								<Tooltip
									title="You can't modify this field"
									disableFocusListener
								>
									<input
										value={userEmail}
										disabled
										className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold cursor-not-allowed'
										{...register("userEmail", {
											required: true,
										})}
										aria-invalid={
											errors.userEmail ? "true" : "false"
										}
									/>
								</Tooltip>
								{errors.userEmail?.type === "required" && (
									<p
										role='alert'
										className='text-[12px] text-red-500'
									>
										Email is required
									</p>
								)}
							</div>

							{/* user Current Station  */}
							<div>
								<div>
									<label htmlFor=''>Current Station_</label>
								</div>
								<Tooltip
									title="You can't modify this field"
									disableFocusListener
								>
									<input
										value={currentWorkStation}
										disabled
										type='text'
										className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold cursor-not-allowed'
										{...register("currentStation", {
											required: true,
										})}
										aria-invalid={
											errors.currentStation
												? "true"
												: "false"
										}
									/>
								</Tooltip>
								{errors.currentStation?.type === "required" && (
									<p
										role='alert'
										className='text-[12px] text-red-500'
									>
										Joining Date is required
									</p>
								)}
							</div>

							{/* new Station  */}
							<div>
								<div>
									<label htmlFor=''>New Station</label>
								</div>
								<select
									className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold'
									{...register("password", {
										required: true,
									})}
									aria-invalid={
										errors.password ? "true" : "false"
									}
								>
									<option
										value=''
										className='hidden'
									>
										female
									</option>
									<option value='male'>male</option>
									<option value='other'>other</option>
								</select>
								{errors.password?.type === "required" && (
									<p
										role='alert'
										className='text-[12px] text-red-500'
									>
										Password is required
									</p>
								)}
							</div>
							{/* user agree  */}
							<div className='col-span-2'>
								<div>
									<label htmlFor=''>Trams & Condition_</label>
								</div>
								<div className='flex items-center justify-between max-w-[70%]'>
									<div className='flex items-center gap-2'>
										<Checkbox
											{...label}
											{...register("isAgree", {
												required: true,
											})}
											aria-invalid={
												errors.password
													? "true"
													: "false"
											}
											size='small'
											sx={{
												color: "white",
											}}
										/>

										<label htmlFor=''>
											I agree with the trams and condition
										</label>
									</div>
								</div>
								{errors.isAgree?.type === "required" && (
									<p
										role='alert'
										className='text-[12px] text-red-500'
									>
										You have to agree with trams and
										condition
									</p>
								)}
							</div>
						</div>

						<div>
							<Button
								disabled={createUserIsLoading}
								type='submit'
								className='w-full py-2 bg-[#3498DB] mt-5 text-white'
							>
								Transfer
							</Button>
						</div>
					</form>
				</div>
			</div>

			<GlobalLoading isOpen={createUserIsLoading} />
		</div>
	);
};

export default TransferUser;
