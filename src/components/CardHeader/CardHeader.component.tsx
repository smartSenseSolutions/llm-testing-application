import { Field, FieldInputProps } from 'react-final-form';
import { Select } from '@patent-app/stories';
import { ActionButton } from '../ActionButton';
import { Item } from '@patent-app/types/Common.type';
import Icons from '@patent-app/icons';

type CardHeaderProps = {
    title: string;
    isExpanded: boolean;
    onZoomHandler: () => void;
    icon?: JSX.Element;
    isSelectVisible?: boolean;
    options?: Item[];
    onSelectOptionChange?: (input: FieldInputProps<string>, value: string) => void;
    isBrowsePromptVisible?: boolean;
    onBrowsePromptClick?: () => void;
    className?: string;
};

const CardHeader = ({
    title,
    isExpanded,
    onZoomHandler,
    icon = undefined,
    isSelectVisible = true,
    options = [],
    onSelectOptionChange = () => {},
    isBrowsePromptVisible = true,
    onBrowsePromptClick = () => {},
    className = '',
}: CardHeaderProps) => {
    return (
        <div className={`flex justify-between card-header ${className}`}>
            <div className="flex items-center gap-[10px] text-[16px] font-medium">
                {icon ? <span className="figure-icon">{icon}</span> : <></>}
                {title}
            </div>

            <div className="flex items-center gap-[10px]">
                {isSelectVisible ? (
                    <Field
                        name="target_model"
                        render={({ input }) => (
                            <div className="min-w-[120px]">
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    {...input}
                                    onChange={(event) => onSelectOptionChange(input, event.target.value as string)}
                                    options={options}
                                    fullWidth
                                />
                            </div>
                        )}
                    />
                ) : (
                    <></>
                )}

                {isBrowsePromptVisible ? (
                    <ActionButton title="Browse Prompt" icon={<Icons.BrowsePrompt />} onClick={onBrowsePromptClick} />
                ) : (
                    <></>
                )}

                <ActionButton
                    title={isExpanded ? 'Collapse' : 'Expand'}
                    icon={isExpanded ? <Icons.ZoomIn /> : <Icons.ZoomOut />}
                    onClick={onZoomHandler}
                />
            </div>
        </div>
    );
};

export { CardHeader };
