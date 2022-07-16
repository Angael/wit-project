import React, { useEffect } from 'react';
import { useAuth } from '../utils/firebase/useAuth';
import { useNavigate } from 'react-router';

const ProtectedRoute = ({children}) => {
    const { authUser, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !authUser) {
            navigate('/');
        }
    }, [authUser, loading]);

    if(loading || (!authUser)){
        return null;
    } else  {
        return children;
    }
};

export default ProtectedRoute;