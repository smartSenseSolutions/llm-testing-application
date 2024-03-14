import { styled } from '@mui/material/styles';

export const StyledDiv = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 100vh;

    h2,
    pre {
        margin: 0;
    }
`;
