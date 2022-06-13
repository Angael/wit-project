import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { authContext } from './authContextProvider';

export const useAuth = () => useContext(authContext);

// Protects routes form being displayed for non authorized users
export const useProtectedRoute = () => {
    const { authUser, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/');
        }
    }, [authUser, loading]);
};
