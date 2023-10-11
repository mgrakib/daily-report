/** @format */

import { useDispatch, useSelector } from "react-redux";
import useChangeNavStatus from "../../hooks/useChangeNavStatus/useChangeNavStatus";
import { changeNavState } from "../../redux/features/nav-value-state/navValueSlice";

import { useForm } from "react-hook-form";

import { Button, Checkbox, Tooltip } from "@mui/material";

import { useGetSingleUserQuery } from "../../redux/createApi/createApi";
import GlobalLoading from "../../Shared/global-loading/global-loading";
import { useEffect, useState } from "react";
const TransferUser = () => {
	const [targetUser, setTargetUser] = useState(null);
	//change automatically nav name and state
	const dispatch = useDispatch();
	useChangeNavStatus(dispatch, changeNavState, true, "TRANSFER USER");
	const { isOpen, stationsName } = useSelector(
		state => state.workStationList
	);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = data => {
		const userInfo = {
			...data,
		};

		console.log(userInfo);
	};

	const { data: singleUser, isLoading } = useGetSingleUserQuery({
		key: "userServiceID",
		value: watch("userServiceID"),
	});

	useEffect(() => {
		setTargetUser(singleUser?.user);
	}, [singleUser]);

	
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
										value={targetUser?.userName ?? ""}
										disabled
										className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold cursor-not-allowed'
									/>
								</Tooltip>
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
										value={targetUser?.userEmail ?? ""}
										disabled
										className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold cursor-not-allowed'
									/>
								</Tooltip>
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
										value={
											targetUser?.currentWorkStation ?? ""
										}
										disabled
										type='text'
										className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold cursor-not-allowed'
									/>
								</Tooltip>
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
								disabled={false} //TODO: change real vlaue
								type='submit'
								className='w-full py-2 bg-[#3498DB] mt-5 text-white'
							>
								Transfer
							</Button>
						</div>
					</form>
				</div>
			</div>
			<GlobalLoading
				isOpen={false} //TODO: change real vlaue
			/>
		</div>
	);
};

export default TransferUser;
