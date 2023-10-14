/** @format */

import { useDispatch, useSelector } from "react-redux";
import useChangeNavStatus from "../../hooks/useChangeNavStatus/useChangeNavStatus";
import { changeNavState } from "../../redux/features/nav-value-state/navValueSlice";

import { useForm } from "react-hook-form";

import { Button, Checkbox, Radio, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import {
	useCreateNewUserMutation,
	useGetSingleUserQuery,
	useGetTodayReportQuery,
} from "../../redux/createApi/createApi";
import GlobalLoading from "../../Shared/global-loading/global-loading";
import PDFPage from "./pdf-page";

const STATE_INIT = {
	allStationNameDisable: true,
	individualReportCollops: true,
	stationName: null,
	reportDate: null,
	userServiceID: null,
};
const DownloadReport = () => {
	const [state, setState] = useState({ ...STATE_INIT });
	const [targetUser, setTargetUser] = useState(null); //this value will display at the disabled field

	//change automatically nav name and state
	const dispatch = useDispatch();
	useChangeNavStatus(dispatch, changeNavState, true, "DOWNLOAD REPORT");
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm(); //form attribute

	const { data: singleUser, isLoading } = useGetSingleUserQuery({
		key: "userServiceID",
		value: state.userServiceID,
	}); // api request for track user on service id

	useEffect(() => {
		//load target user value to display disable filed
		setTargetUser(singleUser?.user);
	}, [singleUser]);

	const { isOpen, stationsName } = useSelector(
		state => state.workStationList
	); //get stations name

	const {
		data: stationUpdateReport,
		isLoading: stationUpdateReportIsLoading,
	} = useGetTodayReportQuery({
		stationName: state.stationName,
		reportDate: state.reportDate,
		userServiceID: state.userServiceID,
	});

	console.log(
		stationUpdateReport,
		" user daosdfj",
		state.stationName,
		state.reportDate,
		state.userServiceID
	);
	const handelChange = e => {
		const { name, value } = e.target;
		setState(pre => ({
			...pre,
			[name]: value,
		}));
	};

	const handelSubmit = e => {
		e.preventDefault();
		console.log(state);
	};

	useEffect(() => {
		// section collops or not
		if (state.individualReportCollops) {
			setState(pre => ({
				...pre,
				stationName: "All",
				userServiceID: "",
				reportDate: "",
			}));
		} else if (!state.individualReportCollops) {
			setState(pre => ({
				...pre,
				stationName: "",
				reportDate: "",
			}));
		}
	}, [state.individualReportCollops]);

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
					<h3 className='text-2xl font-semibold '>
						Download Report_
					</h3>

					<form
						className='font-light mt-7 '
						onSubmit={handelSubmit}
					>
						<div>
							{/* section for station  */}
							<div
								className={`grid grid-cols-2 gap-x-10 gap-y-7  ${
									state.individualReportCollops
										? "max-h-full "
										: "max-h-0 overflow-hidden "
								}`}
							>
								{/* Station Name  */}

								<div>
									<div>
										<label htmlFor=''>Station Name_</label>
									</div>

									<Tooltip title='Default Select All Station'>
										<select
											value={state.stationName}
											name={"stationName"}
											onChange={handelChange}
											disabled={
												state?.allStationNameDisable
											}
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold'
										>
											<option value={"All"}>
												All Station_
											</option>

											{stationsName.map(stationName => (
												<option
													disabled={
														stationName === "NTMC"
													}
													value={stationName}
													key={stationName}
												>
													{stationName}
												</option>
											))}
										</select>
									</Tooltip>

									<div>
										<Tooltip title='Check it if you want to download Specific One Station Report'>
											<Checkbox
												onChange={() =>
													setState(pre => ({
														...pre,
														allStationNameDisable:
															!state.allStationNameDisable,
													}))
												}
												size='small'
												sx={{
													color: "gray",
												}}
											/>
										</Tooltip>
									</div>
								</div>

								{/* user Report Date  */}
								<div>
									<div>
										<label htmlFor=''>Report Date_</label>
									</div>
									<Tooltip title='Default Date is Today. If you want to Change it'>
										<input
											name={"reportDate"}
											value={state?.reportDate}
											onChange={handelChange}
											type='date'
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold'
										/>
									</Tooltip>
								</div>
							</div>

							{/* collops  */}
							<div className='flex items-center my-6'>
								<Tooltip title='Check it if you want to download Specific One Station Report'>
									<Checkbox
										onChange={() =>
											setState(pre => ({
												...pre,
												individualReportCollops:
													!state.individualReportCollops,
											}))
										}
										size='small'
										sx={{
											color: "gray",
										}}
									/>
								</Tooltip>
								<div>
									<label
										htmlFor=''
										className='text-[13px]'
									>
										Check it, If want to download Individual
										Report_
									</label>
								</div>
							</div>

							{/* section for personal report  */}
							<div
								className={`grid grid-cols-2 gap-x-10 gap-y-7  ${
									state.individualReportCollops
										? "max-h-0 overflow-hidden "
										: "max-h-full "
								}`}
							>
								{/* user service id  */}
								<div>
									<div>
										<label htmlFor=''>Service ID_</label>
									</div>
									<input
										value={state.userServiceID}
										name={"userServiceID"}
										onChange={handelChange}
										className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold'
									/>
								</div>

								{/* user Report Date  */}
								<div>
									<div>
										<label htmlFor=''>Report Date_</label>
									</div>
									<Tooltip title='Default Date is Today. If you want to Change it'>
										<input
											name={"reportDate"}
											value={state?.reportDate}
											type='date'
											onChange={handelChange}
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold'
										/>
									</Tooltip>
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
										<label htmlFor=''>
											Current Station_
										</label>
									</div>
									<Tooltip
										title="You can't modify this field"
										disableFocusListener
									>
										<input
											value={
												targetUser?.currentWorkStation ??
												""
											}
											disabled
											type='text'
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold cursor-not-allowed'
										/>
									</Tooltip>
								</div>
							</div>
						</div>

						<div>
							<Button
								disabled={false}
								type='submit'
								className='w-full py-2 bg-[#3498DB] mt-5 text-white'
							>
								Download_
							</Button>
						</div>
					</form>
				</div>
			</div>

			<PDFPage data={stationUpdateReport?.opeReport ?? {}} />
			<GlobalLoading isOpen={false} />
		</div>
	);
};

export default DownloadReport;
