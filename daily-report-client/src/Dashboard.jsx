/** @format */
import toast, { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/user-dashboard";
import TESt from "./test";



function Dashboard() {
	
	return (
		<>
			<div className='bg-field-color flex gap-2'>
				<div className='w-[15%]'>
					<AdminDashboard />

					{/* <UserDashboard /> */}
				</div>
				<div className='flex-1'>
					<Outlet />
				</div>

				{/* <TESt /> */}
			</div>
			<Toaster />
		</>
	);
}

export default Dashboard;
