import { useState } from 'react';
import { RatingProps } from '@mui/material';
import { Rating, Tooltip } from '@patent-app/stories';

const RatingTooltip = ({ value, ...props }: RatingProps) => {
    // Hooks & Variables
    const [hoverCount, setHoverRatingCount] = useState(0);

    return (
        <Tooltip title={`Click to rate ${hoverCount === -1 ? value : hoverCount} star`}>
            <div>
                <Rating
                    precision={0.5}
                    value={value}
                    onChangeActive={(_, value) => {
                        if (value !== -1) {
                            setHoverRatingCount(value);
                        }
                    }}
                    {...props}
                />
            </div>
        </Tooltip>
    );
};

export { RatingTooltip };
