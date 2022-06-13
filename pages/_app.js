import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { AuthContextProvider } from '../components/firebase/authContextProvider';

const theme = createTheme();

function MyApp({ Component, pageProps }) {
    return (
        <AuthContextProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </AuthContextProvider>
    );
}

export default MyApp;
