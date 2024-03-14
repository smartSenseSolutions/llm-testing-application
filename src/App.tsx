import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { CircularLoader } from './stories/components/CircularLoader';
import { StyledToastContainer } from './stories/components/Alert';
import { ApiLoader } from './components/ApiLoader';
import { routes } from './routes/Route';
import theme from './theme';
// Translation is not used so below import is commented
// import './i18n';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

function App() {
    return (
        <Suspense fallback={<CircularLoader />}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ApiLoader />
                <StyledToastContainer />
                <RouterProvider router={routes} />
            </ThemeProvider>
        </Suspense>
    );
}

export default App;
