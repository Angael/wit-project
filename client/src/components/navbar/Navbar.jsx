import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../../utils/firebase/useAuth';
import { Link as MuiLink, Stack } from '@mui/material';

const Navbar = () => {
    const { authUser, signOut } = useAuth();

    return (
        <Stack direction='row' gap={2} justifyContent='center' sx={{ pb: 3 }}>
            <NavLink to='/'>Strona główna</NavLink>
            {!authUser && (
                <>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/register'>Rejestracja</NavLink>
                </>
            )}

            {!!authUser && (
                <>
                    <NavLink to='/files'>Pliki</NavLink>
                    <MuiLink onClick={signOut} href='#'>
                        Wyloguj
                    </MuiLink>
                </>
            )}
        </Stack>
    );
};

export default Navbar;
