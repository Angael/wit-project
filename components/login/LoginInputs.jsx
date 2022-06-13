import React, { useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';

function LoginInputs({ onLogin, isLogin = true }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Stack gap={2} alignItems='start'>
            <TextField
                label='Adres Email'
                type='text'
                variant='outlined'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                label='Hasło'
                type='password'
                variant='outlined'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button
                variant='contained'
                onClick={() => onLogin(email, password)}
            >
                {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
            </Button>
        </Stack>
    );
}

export default LoginInputs;
