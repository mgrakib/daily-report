/** @format */

import { createBrowserRouter } from "react-router-dom";
import SignIN from "../Pages/Signin";
import Dashboard from "../Dashboard";


const router = createBrowserRouter([
	{
		path: "/",
		element: <SignIN />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
]);
export default router;