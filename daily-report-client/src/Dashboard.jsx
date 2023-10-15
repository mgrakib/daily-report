/** @format */
import toast, { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/user-dashboard";
import TESt from "./test";
import { useSelector } from "react-redux";
import GlobalLoading from "./Shared/global-loading/global-loading";

function Dashboard() {
	const user = useSelector(state => state.userSlice);
	console.log(user);
	return (
		<>
			<div className='bg-field-color flex gap-2'>
				<div className='w-[15%]'>
					{user.role === "USER" ? (
						<UserDashboard />
					) : (
						<AdminDashboard />
					)}
				</div>
				<div className='flex-1'>
					<Outlet />
				</div>

				<TESt />

				<GlobalLoading isOpen={user.isLoading} />
			</div>
			<Toaster />
		</>
	);
}

export default Dashboard;
