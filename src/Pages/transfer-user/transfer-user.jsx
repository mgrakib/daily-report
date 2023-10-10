import React from 'react';
import { useDispatch } from 'react-redux';
import useChangeNavStatus from '../../hooks/useChangeNavStatus/useChangeNavStatus';
import { changeNavState } from '../../redux/features/nav-value-state/navValueSlice';

const TransferUser = () => {
	//change automatically nav name and state
	const dispatch = useDispatch();
	useChangeNavStatus(dispatch, changeNavState, true, "TRANSFER USER");
	return <div className='text-dark-common-color'>this is transfer file</div>;
};

export default TransferUser;