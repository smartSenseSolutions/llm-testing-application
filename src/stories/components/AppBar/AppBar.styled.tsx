/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { AppBar, Box, Container, Menu, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)`
    background: ${({ theme }) =>
        `linear-gradient(311deg, ${theme.colors.turquoise} 0%, ${theme.colors.earthBlue}  50%, ${theme.colors.artyClickCoolMagenta}  100%)`};
    box-shadow: unset;

    .MuiContainer-root {
        margin-left: unset;
        padding-left: 0;
        padding-right: 0;
        max-width: 100%;
    }
`;
const StyledContainer = styled(Container)`
    display: flex;
    align-items: center;
    justify-content: space-between;

    .MuiToolbar-root {
        align-items: flex-end;
        padding-left: 0;
        padding-right: 0;
    }
`;
const StyledToolbar = styled(Toolbar)``;

const StyledMenuContainer = styled(Box)`
    display: flex;
    align-items: flex-end;
    gap: 7.5rem;
    padding-bottom: 2.5rem;

    & > .navLink {
        color: ${({ theme }) => theme.colors.white};
        position: relative;
        list-style-type: none;
        text-decoration: none;
        font-size: 2rem;
        font-weight: 400;

        &::after {
            background-color: ${({ theme }) => theme.colors.turquoise};
            position: absolute;
            content: '';
            transition: width 0.3s;
            left: 0;
            bottom: -5px;
            height: 3px;
            width: 0;
            border-radius: 15%;
        }

        &.active {
            font-weight: 600;
            ::after {
                width: 1.9rem;
            }
        }

        &:hover {
            ::after {
                width: 1.9rem;
            }
        }
    }
`;
const StyledLogo = styled('div')`
    img {
        max-width: 100%;
        height: 9.2rem;
        width: 11.5rem;
        margin-right: 8.7rem;
        margin-left: 15rem;
    }
`;

const StyledMenuButton = styled('div')`
    width: 10rem;
`;

const StyledMenu = styled(Menu)`
    .MuiList-root {
        padding: 0;
        list-style-type: none;
    }
`;

const StyledMenuItem = styled('li')`
    a,
    button {
        color: ${({ theme }) => theme.colors.davyGrey};
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;
        background-color: transparent;
        padding: 1rem 5rem 1rem 1.8rem;
        gap: 0.5rem;
        font-size: 1.6rem;
        font-weight: 400;
        border: 0;

        svg {
            width: 1.9rem;
            height: 1.9rem;
        }

        &:hover,
        &.active {
            background: ${({ theme }) => theme.colors.artyClickCoolMagenta10};
            border-radius: 0rem 0rem 0.375rem 0.375rem;
        }
    }
`;

export {
    StyledAppBar,
    StyledContainer,
    StyledToolbar,
    StyledMenuContainer,
    StyledLogo,
    StyledMenuButton,
    StyledMenu,
    StyledMenuItem,
};
