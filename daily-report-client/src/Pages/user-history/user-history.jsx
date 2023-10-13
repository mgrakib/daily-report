import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { changeNavState } from '../../redux/features/nav-value-state/navValueSlice';
import useChangeNavStatus from '../../hooks/useChangeNavStatus/useChangeNavStatus';
import { Button, Tooltip } from '@mui/material';

const UserHistory = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const adminParam = queryParams.get("admin");
	const s_iParam = queryParams.get("s_i");

    //change automatically nav name and state
    const dispatch = useDispatch()
    useChangeNavStatus(dispatch, changeNavState, true ,"USER HISTORY");
    
    
    return (
		<div
			style={{
				backgroundImage:
					"url(https://i.ibb.co/SVRN9jZ/technology.webp)",
				backgroundSize: "cover",
			}}
		>
			<div className='w-full h-full bg-[#000000eb]  '>
				<div className='text-dark-common-color p-10 max-w-5xl mx-auto '>
					<div className={`grid grid-cols-3 gap-x-10 gap-y-7`}>
						{/* user Email  */}
						<div>
							<div>
								<label htmlFor=''>Service ID_</label>
							</div>
							<Tooltip
								title="You can't modify this field"
								disableFocusListener
							>
								<input className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold rounded' />
							</Tooltip>
						</div>
					</div>

					<div className='mt-10'>
						<div className='grid grid-cols-2 gap-10 '>
							{/* proile  */}
							<div className='px-10 pb-10 border border-gray-color rounded shadow-[0_1px_5px_#ffffff1f] bg-[#EBEBEB] col-span-1 row-span-2 '>
								{/* image  */}
								<div className='h-[250px]'>
									<img
										src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'
										alt=''
										className='w-[80%] h-full object-cover mx-auto'
									/>
								</div>

								{/* name info  */}
								<div className='mt-5 text-dashboard-color'>
									{/* TOTD:make it dynamic  */}
									<h3 className='font-bold'>User Profile </h3>

									<div className='mt-2 text-[14px]'>
										{/* name  */}
										<div className='flex items-center justify-between'>
											<p>Name_:</p>
											<p className='font-bold'>
												MG Rakib
											</p>
										</div>
										{/* email  */}
										<div className='flex items-center justify-between'>
											<p>Email_:</p>
											<p className='font-bold'>
												mgrakibbd@gmail.com
											</p>
										</div>
										{/* Service Id  */}
										<div className='flex items-center justify-between'>
											<p>Service Id_:</p>
											<p className='font-bold'>1010</p>
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
											Narayanjong District Jail
										</h1>
									</div>
								</div>

								<div className='px-2 pt-5 flex flex-col gap-5 '>
									{/* joining date  */}
									<div className='flex items-center justify-between'>
										<p>Joining Date:</p>
										<p className='px-2 py-1 bg-gradient-to-r from-dashboard-color to-field-color rounded-md text-dark-common-color text-[14px]'>
											14-10-2023
										</p>
									</div>
									{/* joining date  */}
									<div className='flex items-center justify-between'>
										<p>Last Transfer Date:</p>
										<p className='px-2 py-1 bg-gradient-to-r from-secondary-color to-[#e5645d] rounded-md text-dark-common-color text-[14px]'>
											14-10-2023
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

									{/* staiotn  */}
									<div className='grid grid-cols-12 items-center gap-2 text-[14px]'>
										<div className='col-span-1'>
											<div
												style={{
													background: `#${Math.floor(
														Math.random() * 16777215
													)
														.toString(16)
														.padStart(6, "0")}`,
												}}
												className={`w-[15px] h-[15px]  rounded-full`}
											></div>
										</div>
										<div className='col-span-5'>
											Dhaka Central Jail
										</div>
										<div className='col-span-3'>
											14-10-2023
										</div>
										<div className='col-span-3'>
											14-10-2023
										</div>
									</div>
									{/* staiotn  */}
									<div className='grid grid-cols-12 items-center gap-2 text-[14px]'>
										<div className='col-span-1'>
											<div
												style={{
													background: `#${Math.floor(
														Math.random() * 16777215
													)
														.toString(16)
														.padStart(6, "0")}`,
												}}
												className={`w-[15px] h-[15px]  rounded-full`}
											></div>
										</div>
										<div className='col-span-5'>
											Dhaka Central Jail
										</div>
										<div className='col-span-3'>
											14-10-2023
										</div>
										<div className='col-span-3'>
											14-10-2023
										</div>
									</div>
									{/* staiotn  */}
									<div className='grid grid-cols-12 items-center gap-2 text-[14px]'>
										<div className='col-span-1'>
											<div
												style={{
													background: `#${Math.floor(
														Math.random() * 16777215
													)
														.toString(16)
														.padStart(6, "0")}`,
												}}
												className={`w-[15px] h-[15px]  rounded-full`}
											></div>
										</div>
										<div className='col-span-5'>
											Dhaka Central Jail
										</div>
										<div className='col-span-3'>
											14-10-2023
										</div>
										<div className='col-span-3'>
											14-10-2023
										</div>
									</div>
									{/* staiotn  */}
									<div className='grid grid-cols-12 items-center gap-2 text-[14px]'>
										<div className='col-span-1'>
											<div
												style={{
													background: `#${Math.floor(
														Math.random() * 16777215
													)
														.toString(16)
														.padStart(6, "0")}`,
												}}
												className={`w-[15px] h-[15px]  rounded-full`}
											></div>
										</div>
										<div className='col-span-5'>
											Dhaka Central Jail
										</div>
										<div className='col-span-3'>
											14-10-2023
										</div>
										<div className='col-span-3'>
											14-10-2023
										</div>
									</div>
									{/* staiotn  */}
									<div className='grid grid-cols-12 items-center gap-2 text-[14px]'>
										<div className='col-span-1'>
											<div
												style={{
													background: `#${Math.floor(
														Math.random() * 16777215
													)
														.toString(16)
														.padStart(6, "0")}`,
												}}
												className={`w-[15px] h-[15px]  rounded-full`}
											></div>
										</div>
										<div className='col-span-5'>
											Dhaka Central Jail
										</div>
										<div className='col-span-3'>
											14-10-2023
										</div>
										<div className='col-span-3'>
											14-10-2023
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserHistory;