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
		title: "USER HISTORY",
		buttonTitle: "View History",
		icon: "arrows-rotate",
		link: "/dashboard/user-history?s_i=12",
		id: "adminNav#2",
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
