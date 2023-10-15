/** @format */

import { ImSpinner2 } from "react-icons/im";

const GlobalLoading = ({ isOpen = false }) => {
	return (
		<div
			className={`fixed w-screen h-screen bg-[#000000a1] inset-0 duration-200 ${
				isOpen
					? "transform scale-x-100 scale-y-100"
					: "transform scale-x-0 scale-y-0"
			}`}
		>
			<div className='w-full h-full flex items-center justify-center text-white text-4xl animate-spin'>
				<ImSpinner2 />
			</div>
		</div>
	);
};

export default GlobalLoading;
