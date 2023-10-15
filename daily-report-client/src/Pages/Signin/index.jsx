/** @format */

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useChangeNavStatus from "../../hooks/useChangeNavStatus/useChangeNavStatus";
import { changeNavState } from "../../redux/features/nav-value-state/navValueSlice";
import { Button, Radio } from "@mui/material";
import { useState } from "react";
import { useCreateNewUserMutation } from "../../redux/createApi/createApi";
import GlobalLoading from "../../Shared/global-loading/global-loading";
import axios from "axios";
import toast from "react-hot-toast";
import { createUser, singIn } from "../../redux/features/user-slice/user-slice";
import { useNavigate, useParams } from "react-router-dom";

const CreateNewUser = () => {
	const navigate = useNavigate();

	const { isLoading } = useSelector(state => state.userSlice);
	//change automatically nav name and state
	const dispatch = useDispatch();
	useChangeNavStatus(dispatch, changeNavState, true, "CREATE NEW USER");

	const [selectedGender, setSelectedGender] = useState("male");
	const handleChange = event => {
		setSelectedGender(event.target.value);
	};

	//
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = data => {
		const { email, password } = data;
		dispatch(
			singIn({
				email,
				password,
			})
		)
			.then(response => {
				if (response && !response.error) {
					// Signup was successful, navigate to the home page
					navigate("/dashboard");
				} else {
					// Handle error, if any
				}
			})
			.catch(err => {});
	};
	const userValue = useSelector(state => state.userSlice);

	

	return (
		<div
			style={{
				backgroundImage:
					"url(https://i.ibb.co/SVRN9jZ/technology.webp)",
				backgroundSize: "cover",
			}}
			className='text-dark-common-color h-full '
		>
			<div className='w-full h-screen overflow-y-auto bg-[#000000eb]  p-10 '>
				<div className='shadow-[0_0_20px_10px_#ffffff01] p-5 rounded-md bg-[#8a8a8a22] max-w-2xl mx-auto'>
					<h3 className='text-2xl font-semibold '>Sign In_</h3>

					<form
						className='font-light mt-7 '
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className='grid grid-cols-2 gap-x-10 gap-y-7'>
							{/* user Email  */}
							<div>
								<div>
									<label htmlFor=''>Email_</label>
								</div>
								<input
									className='outline-none py-2 px-2 w-full text-dark-dashboard-color font-semibold'
									{...register("email", {
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
						</div>

						<div className='mt-5'>
							<Button
								disabled={false}
								type='submit'
								className='w-full py-2 bg-[#3498DB] mt-5 text-white'
							>
								Login
							</Button>
						</div>
					</form>
				</div>
			</div>

			<GlobalLoading isOpen={false} />
		</div>
	);
};

export default CreateNewUser;
