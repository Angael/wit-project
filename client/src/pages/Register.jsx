import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import LoginInputs from '../components/login/LoginInputs';
import Navbar from '../components/navbar/Navbar';
import { useAuth } from '../utils/firebase/useAuth';
import  Layout  from '../components/Layout';
import { Typography } from '@mui/material';

export default function Register() {
    const { loading, authUser, register } = useAuth();
    const navigate = useNavigate();

    const onLogin = (email, password) => {
        register(email, password)
            .then(a => {
                console.log('registered', a);
                navigate('/files');
            })
            .catch(e => {
                alert('Error: ' + e.code);
            });
    };

    useEffect(() => {
        if (!loading && authUser) {
            navigate('/');
        }
    }, [loading, authUser]);

    return (
        <Layout>
            <Navbar />

            <main>
                <Typography variant='h2'>Rejestracja</Typography>
                <LoginInputs isLogin={false} onLogin={onLogin} />
            </main>
        </Layout>
    );
}
