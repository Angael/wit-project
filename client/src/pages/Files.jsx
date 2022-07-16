import Navbar from '../components/navbar/Navbar';
import  Layout  from '../components/Layout';
import { Typography } from '@mui/material';
import UploadBox from '../components/files/UploadBox';
import FileList from '../components/files/FileList'

export default function Files() {

    return (
        <Layout>
            <Navbar />

            <main>
                <Typography variant='h2'>Files</Typography>
                <hr />
                <FileList />
                <UploadBox />
            </main>
        </Layout>
    );
}
