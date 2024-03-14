import React from 'react';
import { CssBaseline } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import type { Preview } from '@storybook/react';
import { StyledToastContainer } from '../src/stories/components/Alert';
import theme from '../src/theme';
import 'react-toastify/dist/ReactToastify.css';
import '../src/index.scss';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export const decorators = [
    (Story) => (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
            <CssBaseline />
                <StyledToastContainer />
                <Story />
            </ThemeProvider>
        </StyledEngineProvider>
    ),
];

export default preview;
