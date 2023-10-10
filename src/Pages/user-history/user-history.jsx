import React from 'react';
import { useLocation } from 'react-router-dom';

const UserHistory = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const adminParam = queryParams.get("admin");
	const s_iParam = queryParams.get("s_i");

    
    return <div className='text-dark-common-color'>
        user-history
        {adminParam && 'this request from amdin'}
    </div>;
};

export default UserHistory;