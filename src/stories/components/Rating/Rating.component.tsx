import MuiRating, { RatingProps } from '@mui/material/Rating';

export const Rating = ({ ...props }: RatingProps) => {
    return <MuiRating {...props} />;
};
