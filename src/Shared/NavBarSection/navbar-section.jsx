/** @format */

import { FiUserPlus } from "react-icons/fi";
import NavCard from "../../Shared/NavFloatinCard/NavCard";
import {
	MdOutlineHistoryToggleOff,
	MdOutlineTransferWithinAStation,
	MdOutlineUpdate,
} from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { BsGrid1X2 } from "react-icons/bs";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";



const NAV_VALUE_INIT = {
	value: false,
	activeNav: "CREATE NEW USER",
};

const NavBarSection = ({ NAV_ITEM_INTI }) => {
	// console.log(NAV_ITEM_INTI);
	const [navValue, setNavValue] = useState({ ...NAV_VALUE_INIT });
	const [navPosition, setNavPosition] = useState(navValue?.value);
	
	const handelActiveRouter = (title) => {
		setNavValue(pre => ({
			...pre,
			activeNav: title
		}));
	}
	return (
		<div className={""}>
			<div
				className={`w-screen h-screen bg-dashboard-color p-10 overflow-x-hidden  ${
					navValue?.value
						? "transform -translate-x-[120%] opacity-0"
						: "transform translate-x-0 opacity-100"
				} duration-1000 relative z-50 `}
			>
				<div className='grid grid-cols-3 gap-10'>
					{NAV_ITEM_INTI.map(navItem => (
						<Link
							to={navItem.link}
							key={navItem.id}
						>
							<NavCard //card for create new user
								title={navItem.title}
								buttonTitle={navItem.buttonTitle}
								Icon={navItem.icon}
								setNavValue={setNavValue}
								navValue={navValue}
							/>
						</Link>
					))}
				</div>
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
						{NAV_ITEM_INTI.map(navItem => {
							console.log(navItem);
							return (
								<Link
									key={navItem.id}
									to={navItem.link}
									onClick={() =>
										handelActiveRouter(navItem?.title)
									}
								>
									<li //li for create new user
										className={`text-dark-common-color flex  py-3 px-2 ${
											navValue.activeNav ===
											`${navItem?.title}`
												? "bg-effect-color"
												: "hover:bg-effect-color"
										} items-center duration-1000 gap-3 cursor-pointer  ${
											navPosition
												? "animate-bounce-custom"
												: ""
										}`}
									>
										<span>
											<FontAwesomeIcon
												icon={[
													"fas",
													`${navItem.icon}`,
												]}
											/>
										</span>
										<span className='text-[13px]'>
											{navItem?.title}
										</span>
									</li>
								</Link>
							);
						})}
					</div>
				</ul>

				<Link to={"/dashboard"}>
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
				</Link>
			</div>
		</div>
	);
};

export default NavBarSection;
