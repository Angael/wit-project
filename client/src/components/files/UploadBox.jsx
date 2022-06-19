import React from 'react';
import { Button, Stack, styled } from '@mui/material';
import API from '../../utils/axios';

const Input = styled('input')({
    display: 'none',
});

const UploadBox = () => {
    const handleChangeFileImage = event => {
        if (!event.target.files) {
            return;
        }
        const files = Array.from(event.target.files);
        const file = files[0];
        console.log({ file });

        const formData = new FormData();
        formData.append('file', file);

        API.post('/api/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: Infinity,
        })
            .then(response => {
                console.log('response', response);
            })
            .catch(e => {
                console.log('e', e);
            });
    };

    return (
        <Stack>
            <label htmlFor='upload-input'>
                <Input
                    id='upload-input'
                    type='file'
                    onChange={handleChangeFileImage}
                />
                <Button variant='contained' component='span'>
                    Wybierz i wyślij pliki
                </Button>
            </label>
            (maksymalnie 2MB)
        </Stack>
    );
};

export default UploadBox;
