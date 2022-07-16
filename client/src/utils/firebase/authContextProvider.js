import { createContext, useEffect, useState } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase';

export const authContext = createContext({
    authUser: null,
    loading: true,
    login: async () => {},
    register: async () => {},
    signOut: async () => {},
});

const formatAuthUser = user => ({
    uid: user.uid,
    email: user.email,
});

function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authStateChanged = async authState => {
        if (!authState) {
            setAuthUser(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        const formattedUser = formatAuthUser(authState);
        setAuthUser(formattedUser);
        setLoading(false);
    };

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const register = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const signOut = () =>
        auth.signOut().then(() => {
            setAuthUser(null);
            setLoading(true);
        });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        loading,
        login,
        register,
        signOut,
    };
}

export function AuthContextProvider({ children }) {
    const auth = useFirebaseAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
