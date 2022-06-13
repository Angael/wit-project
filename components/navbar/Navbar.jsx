import React from 'react';
import Link from 'next/link';
import { useAuth } from '../firebase/useAuth';
import { Link as MuiLink, Stack } from '@mui/material';

const Navbar = () => {
    const { authUser, signOut } = useAuth();

    return (
        <Stack direction='row' gap={2} justifyContent='center'>
            <Link href='/'>Strona główna</Link>
            {!authUser && (
                <>
                    <Link href='/login'>Login</Link>
                    <Link href='/register'>Rejestracja</Link>
                </>
            )}

            {!!authUser && (
                <>
                    <Link href='/files'>Pliki</Link>
                    <MuiLink onClick={signOut} href='#'>
                        Wyloguj
                    </MuiLink>{' '}
                </>
            )}
        </Stack>
    );
};

export default Navbar;
