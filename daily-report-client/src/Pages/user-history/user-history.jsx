import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { changeNavState } from '../../redux/features/nav-value-state/navValueSlice';
import useChangeNavStatus from '../../hooks/useChangeNavStatus/useChangeNavStatus';

const UserHistory = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const adminParam = queryParams.get("admin");
	const s_iParam = queryParams.get("s_i");

    //change automatically nav name and state
    const dispatch = useDispatch()
    useChangeNavStatus(dispatch, changeNavState, true ,"USER HISTORY");
    
    
    return <div className='text-dark-common-color'>
        user-history
        {adminParam && 'this request from amdin'}
    </div>;
};

export default UserHistory;