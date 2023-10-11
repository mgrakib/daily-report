/** @format */

import { createBrowserRouter } from "react-router-dom";
import SignIN from "../Pages/Signin";
import Dashboard from "../Dashboard";
import CreateNewUser from "../Pages/create-new-user/create-new-user";
import TransferUser from "../Pages/transfer-user/transfer-user";
import UpdateDate from "../Pages/update-data/update-data";
import DownloadReport from "../Pages/download-report/download-report";
import UserHistory from "../Pages/user-history/user-history";



const router = createBrowserRouter([
	{
		path: "/",
		element: <SignIN />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
		children: [
			{
				path: "/dashboard/create-new-user",
				element: <CreateNewUser />,
			},
			{
				path: "/dashboard/transfer-user",
				element: <TransferUser />,
			},
			{
				path: "/dashboard/download-report",
				element: <DownloadReport />,
			},
			{
				path: "/dashboard/update-data",
				element: <UpdateDate />,
			},
			{
				path: "/dashboard/user-history",
				element: <UserHistory />,
			},
		],
	},
]);
export default router;