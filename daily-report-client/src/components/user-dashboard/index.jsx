/** @format */

import NavBarSection from "../../Shared/NavBarSection/navbar-section";

const NAV_ITEM_INTI = [
	{
		title: "UPDATE DATA",
		buttonTitle: "Update",
		icon: "pen-to-square",
		link: "/dashboard/update-data",
		id: "adminNav#1",
	},
	{
		title: "DOWNLOAD REPORT",
		buttonTitle: "Download",
		icon: "file-export",
		link: "/dashboard/download-report",
		id: "adminNav#3",
	},
	{
		title: "USER HISTORY",
		buttonTitle: "Update",
		icon: "arrows-rotate",
		link: "/dashboard/user-profile?admin=true",
		id: "adminNav#5",
	},
];

const UserDashboard = () => {
	return (
		<div>
			<NavBarSection NAV_ITEM_INTI={NAV_ITEM_INTI} />
		</div>
	);
};

export default UserDashboard;
