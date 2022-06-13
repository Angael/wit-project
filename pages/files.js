import Head from 'next/head';
import Navbar from '../components/navbar/Navbar';
import { useProtectedRoute } from '../components/firebase/useAuth';
import { PageContainer } from '../styles/PageContainer';
import { Typography } from '@mui/material';

export default function Files() {
    useProtectedRoute();

    return (
        <PageContainer>
            <Head>
                <title>Create Next App</title>
                <meta name='description' content='Wit app login screen' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Navbar />

            <main>
                <Typography variant='h2'>Files</Typography>
            </main>
        </PageContainer>
    );
}