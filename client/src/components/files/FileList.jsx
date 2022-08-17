import React from 'react';
import API from '../../utils/axios';
import { QueryCache, useQuery } from 'react-query';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Stack,
    Typography,
} from '@mui/material';
import { queryClient } from '../../App';

const fetchList = () => API.get('/api/list').then(response => response.data);

const FileList = () => {
    const fileList = useQuery('fileList', fetchList);

    const onDownload = file => {
        API.get('/api/item/' + encodeURIComponent(file.id)).then(response =>
            window.open(response.data.url, '_blank')
        );
    };

    const onDelete = id => {
        API.delete('/api/item/' + encodeURIComponent(id)).then(() =>
            queryClient.invalidateQueries('fileList')
        );
    };

    return (
        <Stack
            gap={1}
            sx={{
                my: 2,
                opacity: fileList.isRefetching ? 0.7 : 1,
                transition: '0.1s',
            }}
        >
            {fileList.isFetching && !fileList.isRefetching && (
                <CircularProgress />
            )}
            {fileList.data?.map(file => (
                <Card key={file.id} variant='outlined'>
                    <CardContent>
                        <Typography variant='body1'>{file.filename}</Typography>
                        {/*<Typography variant='caption' color='textSecondary'>*/}
                        {/*    {file.id}*/}
                        {/*</Typography>*/}
                    </CardContent>
                    <CardActions>
                        <Button
                            variant='contained'
                            onClick={() => onDownload(file)}
                        >
                            Pobierz
                        </Button>
                        <Button
                            variant='outlined'
                            color='error'
                            onClick={() => onDelete(file.id)}
                        >
                            Usuń
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Stack>
    );
};

export default FileList;
