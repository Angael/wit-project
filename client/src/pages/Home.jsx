import { Button, Stack, Typography } from '@mui/material';
import Navbar from '../components/navbar/Navbar';
import Layout  from '../components/Layout';

export default function Home() {
    return (
        <Layout>
            <Navbar />

            <main>
                <Stack gap={2}>
                    <Typography variant='h2'>Dysk chmurowy w Azure.</Typography>

                    <Typography variant='body1'>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Zaloguj się by wejść w "pliki" i przesłać / pobrać
                        pliki.
                    </Typography>
                </Stack>
            </main>
        </Layout>
    );
}
