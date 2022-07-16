import React from 'react';
import API from '../../utils/axios';
import { useQuery } from 'react-query';
import { useAuth } from '../../utils/firebase/useAuth';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Stack,
} from '@mui/material';

const fetchList = () => API.get('/api/list').then(response => response.data);

const FileList = () => {
    const fileList = useQuery('fileList', fetchList);

    return (
        <Stack gap={1} sx={{ my: 2 }}>
            {fileList.isFetching && !fileList.isRefetching && (
                <CircularProgress />
            )}
            {fileList.data?.map(file => (
                <Card key={file.id} variant='outlined'>
                    <CardContent>{file.filename}</CardContent>
                    <CardActions>
                        <Button variant='contained'>Pobierz</Button>
                        <Button variant='outlined' color='error'>
                            Usuń
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Stack>
    );
};

export default FileList;
