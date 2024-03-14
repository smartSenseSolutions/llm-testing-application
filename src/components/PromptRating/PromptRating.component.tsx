import { useRef, useState } from 'react';
import { Tooltip } from '@patent-app/stories';
import { RatingTooltip } from '../RatingTooltip';
import { isEmptyValue } from '@patent-app/utils/helpers/common.helper';
import { PromptApi } from '@patent-app/apis';

type PromptRatingProps = {
    averageRating: number;
    promptId?: string;
    isGrid?: boolean;
    numberOfRating: number;
    onRatingChange?: (promptId: string, averageRating: number, numberOfRating: number) => void;
};

const PromptRating = ({
    averageRating,
    promptId = '',
    isGrid = false,
    numberOfRating,
    onRatingChange = () => {},
}: PromptRatingProps) => {
    // Hooks & Variables
    const [rating, setRating] = useState(numberOfRating > 0 ? averageRating : 0);
    const numberOfRatingRef = useRef<number>(numberOfRating);

    // Api Calls

    const saveRating = (value: number | null) => {
        if (!isEmptyValue(value) && value !== null && promptId) {
            setRating((prevValue) => {
                const newRating = (prevValue * numberOfRatingRef.current + value) / (numberOfRatingRef.current + 1);
                numberOfRatingRef.current += 1;
                onRatingChange(promptId, newRating, numberOfRatingRef.current);
                return newRating;
            });
            PromptApi.update({ rating: value }, promptId).then(() => {});
        }
    };

    // Events

    // Helpers

    // JSX Methods

    return (
        <div className={`${!isGrid ? 'mt-8' : ''} flex items-center gap-[1rem]`}>
            <RatingTooltip
                value={rating}
                onChange={(_, value) => {
                    saveRating(value);
                }}
                name="promptRating"
            />

            <Tooltip title="No. of ratings received till now">
                <span className="text-secondary">{numberOfRatingRef.current}</span>
            </Tooltip>
        </div>
    );
};

export { PromptRating };
