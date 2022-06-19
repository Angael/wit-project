import { useContext, useEffect } from 'react';
import { authContext } from './authContextProvider';
import { useNavigate } from 'react-router';

export const useAuth = () => useContext(authContext);

// Protects routes form being displayed for non authorized users
export const useProtectedRoute = () => {
    const { authUser, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !authUser) {
            navigate('/');
        }
    }, [authUser, loading]);
};
