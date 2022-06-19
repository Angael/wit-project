import Navbar from '../components/navbar/Navbar';
import { useProtectedRoute } from '../utils/firebase/useAuth';
import  Layout  from '../components/Layout';
import { Typography } from '@mui/material';
import UploadBox from '../components/files/UploadBox';

export default function Files() {
    useProtectedRoute();

    return (
        <Layout>
            <Navbar />

            <main>
                <Typography variant='h2'>Files</Typography>
                <hr />
                <UploadBox />
            </main>
        </Layout>
    );
}
