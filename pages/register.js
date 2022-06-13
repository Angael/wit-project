import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import LoginInputs from '../components/login/LoginInputs';
import Navbar from '../components/navbar/Navbar';
import { useAuth } from '../components/firebase/useAuth';
import { PageContainer } from '../styles/PageContainer';
import { Typography } from '@mui/material';

export default function Register() {
    const { loading, authUser, register } = useAuth();
    const router = useRouter();

    const onLogin = (email, password) => {
        register(email, password)
            .then(a => {
                console.log('registered', a);
                router.push('/files');
            })
            .catch(e => {
                alert('Error: ' + e.code);
            });
    };

    useEffect(() => {
        if (!loading && authUser) {
            router.push('/');
        }
    }, [loading, authUser]);

    return (
        <PageContainer>
            <Head>
                <title>Create Next App</title>
                <meta name='description' content='Wit app login screen' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Navbar />

            <main>
                <Typography variant='h2'>Rejestracja</Typography>
                <LoginInputs isLogin={false} onLogin={onLogin} />
            </main>
        </PageContainer>
    );
}
