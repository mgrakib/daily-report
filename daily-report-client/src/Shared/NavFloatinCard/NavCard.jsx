/** @format */
import { Button } from "@mui/material";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { changeNavState } from "../../redux/features/nav-value-state/navValueSlice";
library.add(fas);

const NavCard = ({
	title = "Card New User",
	buttonTitle = "create",
	Icon,
	setNavValue,
	navValue,
}) => {

	const dispatch = useDispatch()
	return (
		<div
			onClick={
				() =>
					dispatch(changeNavState({ activeNav: title, isOpen: true }))
			}
			className='bg-ternary-color px-5 py-3 inline-block rounded-md shadow h-[150px] cursor-pointer relative hover:-translate-y-1 duration-150 hover:shadow-[0_0_4px_0px_rgba(255,255,255,.5)] w-full'
		>
			<div className='flex h-full gap-2 '>
				<div className='flex flex-col flex-1'>
					<h3 className='text-dark-common-color text-xl '>{title}</h3>
					<div className='mt-auto'>
						<Button variant='contained'>{buttonTitle}</Button>
					</div>
				</div>

				<div className='w-[20%] flex items-center justify-center h-full text-4xl text-dark-common-color'>
					<FontAwesomeIcon icon={["fas", `${Icon}`]} />
				</div>
			</div>
		</div>
	);
};

export default NavCard;
