import Head from 'next/head';
import LoginInputs from '../components/login/LoginInputs';
import Navbar from '../components/navbar/Navbar';
import { useAuth } from '../components/firebase/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PageContainer } from '../styles/PageContainer';
import { Typography } from '@mui/material';

export default function Login() {
    const { loading, authUser, login } = useAuth();
    const router = useRouter();

    const onLogin = (email, password) => {
        login(email, password)
            .then(a => {
                console.log('logged in', a);
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
                <Typography variant='h2'>Login</Typography>
                <LoginInputs isLogin={true} onLogin={onLogin} />
            </main>
        </PageContainer>
    );
}
