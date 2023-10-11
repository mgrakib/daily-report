import React from 'react';
import { useDispatch } from 'react-redux';
import useChangeNavStatus from '../../hooks/useChangeNavStatus/useChangeNavStatus';
import { changeNavState } from '../../redux/features/nav-value-state/navValueSlice';

const UpdateDate = () => {
	//change automatically nav name and state
	const dispatch = useDispatch();
	useChangeNavStatus(dispatch, changeNavState, true, "UPDATE DATA");
	return <div className='text-dark-common-color'>this is update data</div>;
};

export default UpdateDate;