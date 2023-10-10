/** @format */

import { Outlet } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/user-dashboard";

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
			</div>
		</>
	);
}

export default Dashboard;
