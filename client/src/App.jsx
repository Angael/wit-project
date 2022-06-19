import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import Router from './pages/Router';
import { AuthContextProvider } from './utils/firebase/authContextProvider';

const theme = createTheme();

export const queryClient = new QueryClient();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <Router />
                    <CssBaseline />
                </AuthContextProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
