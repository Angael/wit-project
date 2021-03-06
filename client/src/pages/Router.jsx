import React from 'react';
import { Routes, Route } from 'react-router';

import Home from './Home';
import Files from './Files';
import Login from './Login';
import Register from './Register';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='files' element={<ProtectedRoute><Files /></ProtectedRoute>} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='*' element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
