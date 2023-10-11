
const GlobalLoading = ({isOpen=false}) => {
    return (
		<div
			className={`fixed w-screen h-screen bg-[#000000a1] inset-0 duration-200 ${
				isOpen
					? "transform scale-x-100 scale-y-100"
					: "transform scale-x-0 scale-y-0"
			}`}
		></div>
	);
};

export default GlobalLoading;