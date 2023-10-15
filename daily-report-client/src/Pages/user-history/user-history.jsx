import dataNotFound from "../../../public/dataNotFound.json";
import Lottie from "lottie-react";
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { changeNavState } from '../../redux/features/nav-value-state/navValueSlice';
import useChangeNavStatus from '../../hooks/useChangeNavStatus/useChangeNavStatus';
import { Button, Tooltip } from '@mui/material';
import { useGetSingleUserQuery, useGetUserPreviousHistoryQuery } from '../../redux/createApi/createApi';
import { useForm } from 'react-hook-form';
import { format } from "date-fns";

const UserHistory = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const adminParam = queryParams.get("admin");
	const s_iParam = queryParams.get("s_i");

	console.log(adminParam, s_iParam);

	//change automatically nav name and state
	const dispatch = useDispatch();
	useChangeNavStatus(dispatch, changeNavState, true, "USER HISTORY");

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm(); //form attribute

	const { data: singleUser, isLoading } = useGetSingleUserQuery({
		key: "userServiceID",
		value: s_iParam ?? watch("userServiceID"),
	}); // api request for track user on service id


    const user = singleUser?.user;
    const {data: userPreviousWorkStation = []} = useGetUserPreviousHistoryQuery(user?.userServiceID);
    const a = userPreviousWorkStation;
    const previousStations = Array.isArray(a) ? [...a] : [];
    previousStations.pop()
    


	return (
		<div
			style={{
				backgroundImage:
					"url(https://i.ibb.co/SVRN9jZ/technology.webp)",
				backgroundSize: "cover",
			}}
			className='h-full'
		>
			<div className='w-full min-h-full bg-[#000000eb]  '>
				<div className='text-dark-common-color p-10 max-w-5xl mx-auto '>
					<div className={`grid grid-cols-3 gap-x-10 gap-y-7`}>
						{/* user Email  */}
						{adminParam && (
							<form className='font-light mt-7 '>
								<div>
									<div>
										<label htmlFor=''>Service ID_</label>
									</div>
									<Tooltip
										title="You can't modify this field"
										disableFocusListener
									>
										<input
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold'
											{...register("userServiceID", {
												required: true,
											})}
											aria-invalid={
												errors.userServiceID
													? "true"
													: "false"
											}
										/>
									</Tooltip>
								</div>
							</form>
						)}
					</div>

					<div className='mt-10'>
						{singleUser?.user ? (
							<div className='grid grid-cols-2 gap-10 '>
								{/* proile  */}
								<div className='px-10 pb-10 border border-gray-color rounded shadow-[0_1px_5px_#ffffff1f] bg-[#EBEBEB] col-span-1 row-span-2 '>
									{/* image  */}
									<div className='h-[250px]'>
										<img
											src={user?.avatar}
											alt=''
											className='w-[80%] h-full object-cover mx-auto'
										/>
									</div>

									{/* name info  */}
									<div className='mt-5 text-dashboard-color'>
										{/* TOTD:make it dynamic if user then show my profile */}
										<h3 className='font-bold'>
											User Profile{" "}
										</h3>

										<div className='mt-2 text-[14px]'>
											{/* name  */}
											<div className='flex items-center justify-between'>
												<p>Name_:</p>
												<p className='font-bold'>
													{user?.userName}
												</p>
											</div>
											{/* email  */}
											<div className='flex items-center justify-between'>
												<p>Email_:</p>
												<p className='font-bold'>
													{user?.userEmail}
												</p>
											</div>
											{/* Service Id  */}
											<div className='flex items-center justify-between'>
												<p>Service Id_:</p>
												<p className='font-bold'>
													{user?.userServiceID}
												</p>
											</div>
											{/* Mobile  */}
											<div className='flex items-center justify-between'>
												<p>Mobile_:</p>
												<p className='font-bold'>
													01333000183
												</p>
											</div>
										</div>
									</div>
								</div>
								{/* current station  */}
								<div className=' border border-gray-color rounded shadow-[0_1px_5px_#ffffff1f] bg-[#EBEBEB] col-span-1 row-span-1  text-dashboard-color pb-2'>
									<div className=' border-b border-gray-color '>
										<div className='px-2'>
											<h2 className='font-bold'>
												Current Station_
											</h2>
											<h1 className='font-bold text-xl'>
												{user?.currentWorkStation}
											</h1>
										</div>
									</div>

									<div className='px-2 pt-5 flex flex-col gap-5 '>
										{/* joining date  */}
										<div className='flex items-center justify-between'>
											<p>Joining Date:</p>
											<p className='px-2 py-1 bg-gradient-to-r from-dashboard-color to-field-color rounded-md text-dark-common-color text-[14px]'>
												{format(
													new Date(
														user?.userJoiningDate
													),
													"dd-MM-yyyy"
												)}
											</p>
										</div>
										{/* joining date  */}
										<div className='flex items-center justify-between'>
											<p>Last Transfer Date:</p>
											<p className='px-2 py-1 bg-gradient-to-r from-secondary-color to-[#e5645d] rounded-md text-dark-common-color text-[14px]'>
												{format(
													new Date(
														user?.lastTransferDate
													),
													"dd-MM-yyyy"
												)}
											</p>
										</div>
									</div>
								</div>
								<div className=' border border-gray-color rounded shadow-[0_1px_5px_#ffffff1f] bg-[#EBEBEB] col-span-1 row-span-1  text-dashboard-color max-h-[230px] overflow-y-auto pb-6'>
									<div className=' border-b border-gray-color '>
										<div className='px-2'>
											<h2 className='font-bold'>
												Previous Workstation History_
											</h2>
										</div>
									</div>

									<div className='px-2 pt-5 flex flex-col gap-3 w-full overflow-x-auto'>
										{/* header  */}
										<div className='grid grid-cols-12 items-center gap-2 text-[14px]'>
											<div className='col-span-1'>
												<div className='w-[15px] h-[15px]  rounded-full'>
													#
												</div>
											</div>
											<div className='col-span-5'>
												Station Name
											</div>
											<div className='col-span-3'>
												Joining Date
											</div>
											<div className='col-span-3'>
												Transfer D.
											</div>
										</div>

										{previousStations.map(station => (
											<div
												key={station._id}
												className='grid grid-cols-12 items-center gap-2 text-[14px]'
											>
												<div className='col-span-1'>
													<div
														style={{
															background: `#${Math.floor(
																Math.random() *
																	16777215
															)
																.toString(16)
																.padStart(
																	6,
																	"0"
																)}`,
														}}
														className={`w-[15px] h-[15px]  rounded-full`}
													></div>
												</div>
												<div className='col-span-5'>
													{station?.stationName}
												</div>
												<div className='col-span-3'>
													{format(
														new Date(
															station?.joiningDate
														),
														"dd-MM-yyyy"
													)}
												</div>
												<div className='col-span-3'>
													{format(
														new Date(
															station?.transferDate
														),
														"dd-MM-yyyy"
													)}
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						) : (
							<div className=''>
								<Lottie
									className='w-[80%] p-0  h-[400px] mx-auto'
									animationData={dataNotFound}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserHistory;