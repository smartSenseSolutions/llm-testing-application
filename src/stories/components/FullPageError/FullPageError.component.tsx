import { FallbackProps } from 'react-error-boundary';
import { StyledDiv } from './FullPageError.styled';

export const FullPageError = ({
    error = new Error('Something went wrong'),
    resetErrorBoundary,
}: FallbackProps): JSX.Element => {
    return (
        <StyledDiv>
            <h2>Something went wrong</h2>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </StyledDiv>
    );
};
