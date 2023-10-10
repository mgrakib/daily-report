import { useEffect } from 'react';

const useChangeNavStatus = (dispatch, changeNavState, isOpen, title) => {
	
	useEffect(() => {
		console.log(isOpen, title);
		dispatch(
			changeNavState({
				isOpen,
				activeNav: title,
			})
		);
	}, [dispatch, changeNavState, title, isOpen]);
};

export default useChangeNavStatus;