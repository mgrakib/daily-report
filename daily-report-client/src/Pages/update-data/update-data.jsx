/** @format */

import { useDispatch } from "react-redux";
import useChangeNavStatus from "../../hooks/useChangeNavStatus/useChangeNavStatus";
import { changeNavState } from "../../redux/features/nav-value-state/navValueSlice";
import { useForm } from "react-hook-form";
import { Button, Radio } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetWorkStationOpeQuery, useSubmitDailyReportMutation } from "../../redux/createApi/createApi";
import GlobalLoading from "../../Shared/global-loading/global-loading";
import { format } from "date-fns";

const UpdateDate = () => {
	const station = "Cox's Bazar District Jail";
	//change automatically nav name and state
	const dispatch = useDispatch();
	useChangeNavStatus(dispatch, changeNavState, true, "UPDATE DATA");

	const [state, setState] = useState([]); // state for value 

	const { data: workStationOpe, isLoading: getOperatorsIsLoading } =
		useGetWorkStationOpeQuery(station); // TODO: change the statation name dynamcit


	const [updateReport, { data: updateReportInfo, isLoading:updateReportIsLoading }] = useSubmitDailyReportMutation()
	
	useEffect(() => {
		if (state.length === 0) {
			//set state value
			workStationOpe?.usersList.forEach(user => {
				setState(pre => [
					...pre,
					{
						userServiceID: `${user?.userServiceID}|${user?.currentWorkStation}`,
						entry: 0,
						release: 0,
					},
				]);
			});
		}
	}, [workStationOpe?.usersList]);

	const handelChange = (e, index) => {
		const { name, value } = e.target;

		setState(prevState => {
			const newState = [...prevState];
			newState[index] = {
				...newState[index],
				[name]: value,
			};
			return newState;
		});
	};

	console.log(updateReportInfo, updateReportIsLoading);

	
	const onSubmit = e => {
		e.preventDefault();
		const jailWarderEntry = e.target.jailWarderEntry.value;
		const jailWarderRelease = e.target.jailWarderRelease.value;
		const newValue = [...state]
		newValue.push({
			userServiceID: `jailWarder|${station}`,
			entry: jailWarderEntry,
			release: jailWarderRelease,
		});

		updateReport(newValue);

	};
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
					<div className='flex items-center justify-between'>
						<h3 className=' '>
							Work Update of <br />
							<span className='text-2xl font-semibold'>
								Narayangang District Jail_
							</span>
						</h3>

						<div>
							<h3 className='text-2xl font-semibold '>
								{format(new Date(), "yyyy-MM-dd")}
							</h3>

							<div className="text-[14px] py-[2px] px-[4px] bg-red-100 text-dashboard-color rounded-sm">
								Update Incomplete
							</div>
						</div>
					</div>

					<form
						className='font-light mt-7 '
						onSubmit={onSubmit}
					>
						<div className='flex flex-col gap-5'>
							{workStationOpe?.usersList?.map((user, index) => {
								const { userName } = user || {};
								return (
									<div key={user._id}>
										<div>
											<p>{userName}_</p>
										</div>
										<div className='grid grid-cols-2 gap-x-10 gap-y-7'>
											{/*ope Entry  */}
											<div>
												<div>
													<label htmlFor=''>
														Entry_
													</label>
												</div>
												<input
													onChange={e =>
														handelChange(e, index)
													}
													value={
														state?.[index]?.entry
													}
													name={`entry`}
													className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold bg-red-200'
												/>
											</div>

											{/*ope Release  */}
											<div>
												<div>
													<label htmlFor=''>
														Release_
													</label>
												</div>
												<input
													onChange={e =>
														handelChange(e, index)
													}
													value={
														state?.[index]?.release
													}
													name={`release`}
													className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold bg-green-200'
												/>
											</div>
										</div>
									</div>
								);
							})}

							<div>
								<div>
									<p>Jail Warder_</p>
								</div>
								<div className='grid grid-cols-2 gap-x-10 gap-y-7'>
									{/*jail warder Entry  */}
									<div>
										<div>
											<label htmlFor=''>Entry_</label>
										</div>
										<input
											defaultValue={0}
											name={"jailWarderEntry"}
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold bg-red-200'
										/>
									</div>

									{/*jail warder Release  */}
									<div>
										<div>
											<label htmlFor=''>Release_</label>
										</div>
										<input
											defaultValue={0}
											name={"jailWarderRelease"}
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold bg-green-200'
										/>
									</div>
								</div>
							</div>
							<div>
								<div></div>
								<div className='grid grid-cols-2 gap-x-10 gap-y-7'>
									{/*active  */}
									<div>
										<div>
											<label htmlFor=''>
												Active Prison_
											</label>
										</div>
										<input
											defaultValue={0}
											name={"activePrison"}
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold bg-red-200'
										/>
									</div>

									{/*jail warder Release  */}
									<div>
										<div>
											<label htmlFor=''>
												Lockup Prison_
											</label>
										</div>
										<input
											defaultValue={0}
											name={"lockupPrison"}
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold bg-green-200'
										/>
									</div>
								</div>
							</div>
						</div>

						<div>
							<Button
								// disabled={false}
								type='submit'
								className='w-full py-2 bg-[#3498DB] mt-5 text-white'
							>
								Register
							</Button>
						</div>
					</form>
				</div>
			</div>

			<GlobalLoading isOpen={false} />
		</div>
	);
};

export default UpdateDate;
