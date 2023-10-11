/** @format */

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import useChangeNavStatus from "../../hooks/useChangeNavStatus/useChangeNavStatus";
import { changeNavState } from "../../redux/features/nav-value-state/navValueSlice";
import { Button, Radio } from "@mui/material";
import { useState } from "react";
import { useCreateNewUserMutation } from "../../redux/createApi/createApi";
import GlobalLoading from "../../Shared/global-loading/global-loading";

const CreateNewUser = () => {
	//change automatically nav name and state
	const dispatch = useDispatch();
	useChangeNavStatus(dispatch, changeNavState, true, "CREATE NEW USER");

	const [selectedGender, setSelectedGender] = useState("male");
	const handleChange = event => {
		setSelectedGender(event.target.value);
	};

	const [createUser, { data: createdUser, isLoading:createUserIsLoading }] =
		useCreateNewUserMutation();

	
	
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
					<h3 className='text-2xl font-semibold '>Registration_</h3>

					<form
						className='font-light mt-7 '
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className='grid grid-cols-2 gap-x-10 gap-y-7'>
							{/* user Full name  */}
							<div>
								<div>
									<label htmlFor=''>Full Name_</label>
								</div>
								<input
									className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold'
									{...register("userName", {
										required: true,
									})}
									aria-invalid={
										errors.userName ? "true" : "false"
									}
								/>
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
								<input
									className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold'
									{...register("userEmail", {
										required: true,
									})}
									aria-invalid={
										errors.userEmail ? "true" : "false"
									}
								/>
								{errors.userEmail?.type === "required" && (
									<p
										role='alert'
										className='text-[12px] text-red-500'
									>
										Email is required
									</p>
								)}
							</div>

							{/* user joining Date  */}
							<div>
								<div>
									<label htmlFor=''>Joining Date_</label>
								</div>
								<input
									type='date'
									className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold'
									{...register("userJoiningDate", {
										required: true,
									})}
									aria-invalid={
										errors.userJoiningDate
											? "true"
											: "false"
									}
								/>
								{errors.userJoiningDate?.type ===
									"required" && (
									<p
										role='alert'
										className='text-[12px] text-red-500'
									>
										Joining Date is required
									</p>
								)}
							</div>

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

							{/* user password  */}
							<div>
								<div>
									<label htmlFor=''>Password_</label>
								</div>
								<input
									className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold'
									{...register("password", {
										required: true,
									})}
									aria-invalid={
										errors.password ? "true" : "false"
									}
								/>
								{errors.password?.type === "required" && (
									<p
										role='alert'
										className='text-[12px] text-red-500'
									>
										Password is required
									</p>
								)}
							</div>
							{/* user Gender  */}
							<div className='col-span-2'>
								<div>
									<label htmlFor=''>Gender_</label>
								</div>
								<div className='flex items-center justify-between max-w-[70%]'>
									<div className='flex items-center gap-2'>
										<Radio
											checked={selectedGender === "male"}
											onChange={handleChange}
											value='male'
											name='radio-buttons'
											inputProps={{
												"aria-label": "male",
											}}
											size='small'
											sx={{
												color: "white",
											}}
										/>

										<label htmlFor=''>Male</label>
									</div>

									<div className='flex items-center gap-2'>
										<Radio
											checked={
												selectedGender === "female"
											}
											onChange={handleChange}
											value='female'
											name='radio-buttons'
											inputProps={{
												"aria-label": "female",
											}}
											size='small'
											sx={{
												color: "white",
											}}
										/>
										<label htmlFor=''>Female</label>
									</div>
									<div className='flex items-center gap-2'>
										<Radio
											checked={selectedGender === "null"}
											onChange={handleChange}
											value={"null"}
											name='radio-buttons'
											inputProps={{
												"aria-label": "null",
											}}
											size='small'
											sx={{
												color: "white",
											}}
										/>
										<label htmlFor=''>
											Prefer not to say
										</label>
									</div>
								</div>
							</div>
						</div>

						<div>
							<Button
								disabled={createUserIsLoading}
								type='submit'
								className='w-full py-2 bg-[#3498DB] mt-5 text-white'
							>
								Register
							</Button>
						</div>
					</form>
				</div>
			</div>

			<GlobalLoading isOpen={createUserIsLoading} />
		</div>
	);
};

export default CreateNewUser;
