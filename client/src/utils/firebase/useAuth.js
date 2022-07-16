import { useContext } from 'react';
import { authContext } from './authContextProvider';

export const useAuth = () => useContext(authContext);
