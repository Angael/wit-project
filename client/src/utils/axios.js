import axios from 'axios';
import { auth } from './firebase/firebase';

const API = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: '/',
});

API.interceptors.request.use(
    async request => {
        const token = await auth.currentUser.getIdToken(false);

        if (token) {
            request.headers.Authorization = 'Bearer ' + token;
        }

        return request;
    },
    error => {
        console.log(error);
    }
);

export default API;
