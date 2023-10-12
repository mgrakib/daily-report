/** @format */

import { useDispatch } from "react-redux";
import useChangeNavStatus from "../../hooks/useChangeNavStatus/useChangeNavStatus";
import { changeNavState } from "../../redux/features/nav-value-state/navValueSlice";
import { useForm } from "react-hook-form";
import { Button, Radio } from "@mui/material";
import { useState } from "react";
import { useCreateNewUserMutation } from "../../redux/createApi/createApi";
import GlobalLoading from "../../Shared/global-loading/global-loading";
import { format } from "date-fns";
const UpdateDate = () => {
	//change automatically nav name and state
	const dispatch = useDispatch();
	useChangeNavStatus(dispatch, changeNavState, true, "UPDATE DATA");

	const [selectedGender, setSelectedGender] = useState("male");
	const handleChange = event => {
		setSelectedGender(event.target.value);
	};

	const [createUser, { data: createdUser, isLoading: createUserIsLoading }] =
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
					<div className='flex items-center justify-between'>
						<h3 className=' '>
							Work Update of <br />
							<span className='text-2xl font-semibold'>
								Narayangang District Jail_
							</span>
						</h3>

						<div className='text-2xl font-semibold '>
							{format(new Date(), "yyyy-MM-dd")}
						</div>
					</div>

					<form
						className='font-light mt-7 '
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className='flex flex-col gap-5'>
							<div>
								<div>
									<p>MG Rakib_</p>
								</div>
								<div className='grid grid-cols-2 gap-x-10 gap-y-7'>
									{/* Entry  */}
									<div>
										<div>
											<label htmlFor=''>Entry_</label>
										</div>
										<input
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold bg-red-200'
											{...register("userName", {
												required: true,
											})}
											aria-invalid={
												errors.userName
													? "true"
													: "false"
											}
										/>
										{errors.userName?.type ===
											"required" && (
											<p
												role='alert'
												className='text-[12px] text-red-500'
											>
												User name is required
											</p>
										)}
									</div>

									{/* Release  */}
									<div>
										<div>
											<label htmlFor=''>Release_</label>
										</div>
										<input
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold bg-green-200'
											{...register("userEmail", {
												required: true,
											})}
											aria-invalid={
												errors.userEmail
													? "true"
													: "false"
											}
										/>
										{errors.userEmail?.type ===
											"required" && (
											<p
												role='alert'
												className='text-[12px] text-red-500'
											>
												Email is required
											</p>
										)}
									</div>
								</div>
							</div>
							<div>
								<div>
									<p>MG Rakib_</p>
								</div>
								<div className='grid grid-cols-2 gap-x-10 gap-y-7'>
									{/* Entry  */}
									<div>
										<div>
											<label htmlFor=''>Entry_</label>
										</div>
										<input
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold bg-red-200'
											{...register("userName", {
												required: true,
											})}
											aria-invalid={
												errors.userName
													? "true"
													: "false"
											}
										/>
										{errors.userName?.type ===
											"required" && (
											<p
												role='alert'
												className='text-[12px] text-red-500'
											>
												User name is required
											</p>
										)}
									</div>

									{/* Release  */}
									<div>
										<div>
											<label htmlFor=''>Release_</label>
										</div>
										<input
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold bg-green-200'
											{...register("userEmail", {
												required: true,
											})}
											aria-invalid={
												errors.userEmail
													? "true"
													: "false"
											}
										/>
										{errors.userEmail?.type ===
											"required" && (
											<p
												role='alert'
												className='text-[12px] text-red-500'
											>
												Email is required
											</p>
										)}
									</div>
								</div>
							</div>
							<div>
								<div>
									<p>MG Rakib_</p>
								</div>
								<div className='grid grid-cols-2 gap-x-10 gap-y-7'>
									{/* Entry  */}
									<div>
										<div>
											<label htmlFor=''>Entry_</label>
										</div>
										<input
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold bg-red-200'
											{...register("userName", {
												required: true,
											})}
											aria-invalid={
												errors.userName
													? "true"
													: "false"
											}
										/>
										{errors.userName?.type ===
											"required" && (
											<p
												role='alert'
												className='text-[12px] text-red-500'
											>
												User name is required
											</p>
										)}
									</div>

									{/* Release  */}
									<div>
										<div>
											<label htmlFor=''>Release_</label>
										</div>
										<input
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold bg-green-200'
											{...register("userEmail", {
												required: true,
											})}
											aria-invalid={
												errors.userEmail
													? "true"
													: "false"
											}
										/>
										{errors.userEmail?.type ===
											"required" && (
											<p
												role='alert'
												className='text-[12px] text-red-500'
											>
												Email is required
											</p>
										)}
									</div>
								</div>
							</div>
							<div>
								<div>
									<p>MG Rakib_</p>
								</div>
								<div className='grid grid-cols-2 gap-x-10 gap-y-7'>
									{/* Entry  */}
									<div>
										<div>
											<label htmlFor=''>Entry_</label>
										</div>
										<input
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold bg-red-200'
											{...register("userName", {
												required: true,
											})}
											aria-invalid={
												errors.userName
													? "true"
													: "false"
											}
										/>
										{errors.userName?.type ===
											"required" && (
											<p
												role='alert'
												className='text-[12px] text-red-500'
											>
												User name is required
											</p>
										)}
									</div>

									{/* Release  */}
									<div>
										<div>
											<label htmlFor=''>Release_</label>
										</div>
										<input
											className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold bg-green-200'
											{...register("userEmail", {
												required: true,
											})}
											aria-invalid={
												errors.userEmail
													? "true"
													: "false"
											}
										/>
										{errors.userEmail?.type ===
											"required" && (
											<p
												role='alert'
												className='text-[12px] text-red-500'
											>
												Email is required
											</p>
										)}
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

export default UpdateDate;
