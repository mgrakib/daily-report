import { Outlet } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";


function Dashboard() {

  return (
		<>
			<div className='bg-field-color flex gap-2'>
				<div className='w-[15%]'>
					<AdminDashboard />
				</div>
        <div className='flex-1'>
          <Outlet />
        </div>
			</div>
		</>
  );
}

export default Dashboard;
