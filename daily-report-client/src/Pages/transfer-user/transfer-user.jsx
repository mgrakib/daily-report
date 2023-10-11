/** @format */

import { useDispatch, useSelector } from "react-redux";
import useChangeNavStatus from "../../hooks/useChangeNavStatus/useChangeNavStatus";
import { changeNavState } from "../../redux/features/nav-value-state/navValueSlice";

import { useForm } from "react-hook-form";

import { Button, Checkbox, Tooltip } from "@mui/material";

import {
	useGetSingleUserQuery,
	useTransferUserMutation,
} from "../../redux/createApi/createApi";
import GlobalLoading from "../../Shared/global-loading/global-loading";
import { useEffect, useState } from "react";
import { changeStatus } from "../../redux/features/work-station-list/work-station-list";
const TransferUser = () => {
	const [targetUser, setTargetUser] = useState(null); //this value will display at the disabled field

	//change automatically nav name and state
	const dispatch = useDispatch();
	useChangeNavStatus(dispatch, changeNavState, true, "TRANSFER USER");

	const { isOpen, stationsName } = useSelector(
		state => state.workStationList
	); //get stations name

	const [
		transferUser,
		{ data: transferUserInfo, isLoading: transferUserIsLoading },
	] = useTransferUserMutation(); //action for transfer user

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm(); //form attribute

	const { data: singleUser, isLoading } = useGetSingleUserQuery({
		key: "userServiceID",
		value: watch("userServiceID"),
	}); // api request for track user on service id

	useEffect(() => {
		//load target user value to display disable filed
		setTargetUser(singleUser?.user);
	}, [singleUser]);
	const label = { inputProps: { "aria-label": "Checkbox demo" } };

	useEffect(() => {
		//change the show station name status depend on target user
		dispatch(changeStatus(singleUser?.user ? true : false));
	}, [singleUser?.user, dispatch]);

	const onSubmit = data => {
		//handel submit to transfer the user
		const s_i = data.userServiceID;
		const new_s = data.newWorkStation;
		transferUser({ s_i, new_s }).then(res => {
			reset();
		}).catch(e => {
			console.log(e)
		})
	};

	console.log(transferUserInfo, transferUserIsLoading);
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
									<label htmlFor=''>New Station_</label>
								</div>
								<Tooltip title='First '>
									<select
										className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold'
										{...register("newWorkStation", {
											required: true,
										})}
										aria-invalid={
											errors.newWorkStation
												? "true"
												: "false"
										}
									>
										{isOpen && (
											<>
												<option
													value=''
													className='hidden'
												>
													Select Next Destination_
												</option>

												{stationsName.map(
													stationName => (
														<option
															className={`${
																stationName ===
																targetUser?.currentWorkStation && 'bg-red-100'
															}`}
															disabled={
																stationName ===
																targetUser?.currentWorkStation
															}
															key={stationName}
														>
															{stationName}
														</option>
													)
												)}
											</>
										)}
									</select>
								</Tooltip>
								{errors.newWorkStation?.type === "required" && (
									<p
										role='alert'
										className='text-[12px] text-red-500'
									>
										New Station is required
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
												errors.isAgree
													? "true"
													: "false"
											}
											size='small'
											sx={{
												color: "white",
											}}
										/>

										<label htmlFor=''>
											I agree with the trams and
											condition_
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
								disabled={!targetUser} //TODO: change real vlaue
								type='submit'
								className='w-full py-2 bg-[#3498DB] mt-5 text-white'
							>
								Transfer_
							</Button>
						</div>
					</form>
				</div>
			</div>
			<GlobalLoading
				isOpen={transferUserIsLoading} //TODO: change real vlaue
			/>
		</div>
	);
};

export default TransferUser;
