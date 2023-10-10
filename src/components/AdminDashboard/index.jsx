import { FiUserPlus } from 'react-icons/fi';
import NavCard from '../../Shared/NavFloatinCard/NavCard';
import { MdOutlineHistoryToggleOff, MdOutlineTransferWithinAStation, MdOutlineUpdate } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { BsGrid1X2 } from "react-icons/bs";
import { useEffect, useState } from 'react';

const NAV_VALUE_INIT = {
	value: false,
	activeNav: "CREATE NEW USER",
};
const AdminDashboard = () => {
    const [navValue, setNavValue] = useState({ ...NAV_VALUE_INIT });
    const [navPosition, setNavPosition] = useState(false)
    useEffect(() => {
        if (navValue?.value) {
            setNavPosition(navValue?.value)
        }
        
    }, [navValue?.value])
    

    console.log(navValue);
   
    return (
		<div
			className={
				"w-screen h-screen bg-dashboard-color p-10 overflow-x-hidden"
			}
		>
			<div
				className={`grid grid-cols-3 gap-10 ${
					navValue?.value
						? "transform -translate-x-[120%] opacity-0"
						: "transform translate-x-0 opacity-100"
				} duration-1000 relative z-50 `}
			>
				<NavCard //card for create new user
					title='CREATE NEW USER'
					buttonTitle='Create'
					Icon={<FiUserPlus />}
					setNavValue={setNavValue}
					navValue={navValue}
				/>
				<NavCard //card for TRANSFER USER
					title='TRANSFER USER'
					buttonTitle='Transfer'
					Icon={<MdOutlineTransferWithinAStation />}
					setNavValue={setNavValue}
					navValue={navValue}
				/>
				<NavCard //card for DOWNLOAD REPORT
					title='DOWNLOAD REPORT'
					buttonTitle='Download'
					Icon={<TbReport />}
					setNavValue={setNavValue}
					navValue={navValue}
				/>
				<NavCard //card for UPDATE DATA
					title='UPDATE DATA'
					buttonTitle='Update'
					Icon={<MdOutlineUpdate />}
					setNavValue={setNavValue}
					navValue={navValue}
				/>
				<NavCard //card for USER HISTORY
					title='USER HISTORY'
					buttonTitle='Update'
					Icon={<MdOutlineHistoryToggleOff />}
					setNavValue={setNavValue}
					navValue={navValue}
				/>
			</div>

			<div
				className={`w-[15%] h-full absolute top-0 left-0 bg-ternary-color duration-300 z-[100] flex flex-col justify-between ${
					!navValue?.value
						? "transform scale-x-0 scale-y-0 opacity-10"
						: "transform scale-x-100 scale-y-100 opacity-100"
				}`}
			>
				<ul className='mt-10 flex flex-col gap-2 overflow-x-hidden'>
					<div>
						<li //li for create new user
							className={`text-dark-common-color flex  py-3 px-2 ${
								navValue.activeNav === "CREATE NEW USER"
									? "bg-effect-color"
									: "hover:bg-effect-color"
							} items-center duration-1000 gap-3 cursor-pointer  ${
								navPosition ? "animate-bounce-custom" : ""
							}`}
						>
							<span>
								<FiUserPlus />
							</span>
							<span className='text-[13px]'>CREATE NEW USER</span>
						</li>
						<li //li for TRANSFER USER
							className={`text-dark-common-color flex  py-3 px-2 ${
								navValue.activeNav === "TRANSFER USER"
									? "bg-effect-color"
									: "hover:bg-effect-color"
							} items-center duration-1000 gap-3 cursor-pointer  ${
								navPosition ? "animate-bounce-custom" : ""
							}`}
						>
							<span>
								<MdOutlineTransferWithinAStation />
							</span>
							<span className='text-[13px]'>TRANSFER USER</span>
						</li>
						<li //li for DOWNLOAD REPORT
							className={`text-dark-common-color flex  py-3 px-2 ${
								navValue.activeNav === "DOWNLOAD REPORT"
									? "bg-effect-color"
									: "hover:bg-effect-color"
							} items-center duration-1000 gap-3 cursor-pointer  ${
								navPosition ? "animate-bounce-custom" : ""
							}`}
						>
							<span>
								<TbReport />
							</span>
							<span className='text-[13px]'>DOWNLOAD REPORT</span>
						</li>
						<li //li for UPDATE DATA
							className={`text-dark-common-color flex  py-3 px-2 ${
								navValue.activeNav === "UPDATE DATA"
									? "bg-effect-color"
									: "hover:bg-effect-color"
							} items-center duration-1000 gap-3 cursor-pointer  ${
								navPosition ? "animate-bounce-custom" : ""
							}`}
						>
							<span>
								<MdOutlineUpdate />
							</span>
							<span className='text-[13px]'>UPDATE DATA</span>
						</li>
						<li //li for USER HISTORY
							className={`text-dark-common-color flex  py-3 px-2 ${
								navValue.activeNav === "USER HISTORY"
									? "bg-effect-color"
									: "hover:bg-effect-color"
							} items-center duration-1000 gap-3 cursor-pointer  ${
								navPosition ? "animate-bounce-custom" : ""
							}`}
						>
							<span>
								<MdOutlineHistoryToggleOff />
							</span>
							<span className='text-[13px]'>USER HISTORY</span>
						</li>
					</div>
				</ul>

				<li //li for USER HISTORY
					className={`text-dark-common-color flex  py-3 px-2 mt-auto hover:bg-effect-color items-center duration-500 gap-3 cursor-pointer  ${
						navPosition ? "animate-bounce-custom" : ""
					}`}
					onClick={() => {
						setNavValue(pre => ({
							...pre,
							value: false,
							activeNav: "CREATE NEW USER",
						}));
					}}
				>
					<span>
						<BsGrid1X2 />
					</span>
					<span className='text-[13px]'>Show On Grid</span>
				</li>
			</div>
		</div>
	);
};

export default AdminDashboard;