
import NavBarSection from '../../Shared/NavBarSection/navbar-section';


const NAV_ITEM_INTI = [
	
	{
		title: "CREATE NEW USER",
		buttonTitle: "Create",
		icon: "user-plus",
		link: "/dashboard/create-new-user",
		id: "adminNav#1",
	},
	{
		title: "TRANSFER USER",
		buttonTitle: "Transfer",
		icon: "arrow-right-arrow-left",
		link: "/dashboard/transfer-user",
		id: "adminNav#2",
	},
	{
		title: "DOWNLOAD REPORT",
		buttonTitle: "Download",
		icon: "file-export",
		link: "/dashboard/download-report",
		id: "adminNav#3",
	},
	{
		title: "UPDATE DATA",
		buttonTitle: "Update",
		icon: "file-pen",
		link: "/dashboard/update-data",
		id: "adminNav#4",
	},
	{
		title: "USER HISTORY",
		buttonTitle: "Update",
		icon: "arrows-rotate",
		link: "/dashboard/user-history?admin=true&s_i=12",
		id: "adminNav#5",
	},
];

const AdminDashboard = () => {

   
    return (
		<>
			<div>
				<NavBarSection NAV_ITEM_INTI={NAV_ITEM_INTI} />
				
			</div>
		</>
	);
};

export default AdminDashboard;