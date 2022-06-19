import { useEffect } from 'react';
import {useNavigate} from 'react-router';

import LoginInputs from '../components/login/LoginInputs';
import Navbar from '../components/navbar/Navbar';
import { useAuth } from '../utils/firebase/useAuth';
import  Layout  from '../components/Layout';
import { Typography } from '@mui/material';

export default function Login() {
    const { loading, authUser, login } = useAuth();
    const navigate = useNavigate();

    const onLogin = (email, password) => {
        login(email, password)
            .then(a => {
                console.log('logged in', a);
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
                <Typography variant='h2'>Login</Typography>
                <LoginInputs isLogin={true} onLogin={onLogin} />
            </main>
        </Layout>
    );
}
