import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { get_encoding } from 'tiktoken';
import { Field, FieldInputProps, useField } from 'react-final-form';
import { useTheme } from '@mui/material';
import { Button, TextArea, Dialog, CircularLoader, Select } from '@patent-app/stories';
import { AddUpdatePrompt } from '../AddUpdatePrompt';
import { ActionButton } from '../ActionButton';
import { getAlert } from '@patent-app/hooks';
import { MODEL_TEXT_LENGTH, MODEL_TYPE, TIMEOUT } from '@patent-app/utils/constants/common.constant';
import { isEmptyValue } from '@patent-app/utils/helpers/common.helper';
import { Model } from '@patent-app/types/Common.type';
import Icons from '@patent-app/icons';
import { GenerationApi } from '@patent-app/apis';

type TextAreaWithGenerateProps = {
    model: Model;
    isGenerateButtonLoading: boolean;
    resetTokenCount: number;
};

const encoding = get_encoding('cl100k_base');

const temperatureList = Array(10)
    .fill('')
    .map((_, index) => {
        const value = (index + 1) / 10;
        return { label: value, value };
    });

const TextAreaWithGenerate = ({ model, isGenerateButtonLoading, resetTokenCount }: TextAreaWithGenerateProps) => {
    // Hooks & Variables

    const modelLength = MODEL_TEXT_LENGTH[model];
    const theme = useTheme();
    const limitExceededRef = useRef(false);
    const [inputTokenCount, setInputTokenCount] = useState(0);
    const { input: queryInput } = useField('query');
    const [addPromptDialogVisible, setAddPromptDialogVisible] = useState(false);

    useEffect(() => {
        if (limitExceededRef.current) {
            getAlert('info', 'Token limit exceeded');
        }
    }, [limitExceededRef.current]);

    useEffect(() => {
        if (resetTokenCount > 0) {
            getTokenLimit(queryInput.value);
        }
    }, [resetTokenCount]);

    const debounceTokenCount = useCallback(debounce(getLlamaMatrixTokenCount, TIMEOUT.STANDARD), [model]);

    // Api Calls

    function getTokenLimit(data: string) {
        if (model === MODEL_TYPE.GPT_4) {
            const tokenLength = encoding.encode(data).length;
            setInputTokenCount(tokenLength);
            limitExceededRef.current = tokenLength > modelLength;
        } else {
            getLlamaMatrixTokenCount(data);
        }
    }

    function getLlamaMatrixTokenCount(data: string) {
        GenerationApi.getModelTokenCount({
            data,
            model_name: model,
        }).then((resp) => {
            if (!isEmptyValue(resp.payload?.token_count)) {
                const { token_count: tokenCount } = resp.payload;
                setInputTokenCount(resp.payload.token_count);
                limitExceededRef.current = tokenCount > modelLength;
            }
        });
    }

    // Events

    const handleQueryChange = (input: FieldInputProps<string>, value: string) => {
        input.onChange(value);

        if (model === MODEL_TYPE.GPT_4) {
            getTokenLimit(value);
        } else {
            debounceTokenCount(value);
        }
    };

    const handleAdddPromptDialogClose = (isSaved: boolean) => {
        if (isSaved) {
            getAlert('success', 'Prompt added successfully');
        }
        setAddPromptDialogVisible(false);
    };

    // Helpers

    // JSX Methods

    return (
        <>
            <Field
                name="query"
                render={({ input }) => (
                    <div className="relative">
                        <TextArea
                            rows={6}
                            {...input}
                            onChange={(event) => handleQueryChange(input, event.target.value)}
                            fullWidth
                            multiline
                            placeholder="Paste your Prompt here..."
                            className="textAreaWithClear"
                        />

                        {input?.value ? (
                            <div className="absolute bottom-0 right-4 flex gap-3 pb-[5px]">
                                <ActionButton icon={<Icons.Clean />} onClick={() => input.onChange('')} title="Clear" />
                                <ActionButton
                                    icon={<Icons.AddToPrompt />}
                                    onClick={() => setAddPromptDialogVisible(true)}
                                    title="Add to prompt Library"
                                />
                            </div>
                        ) : null}
                    </div>
                )}
            />
            <div className="flex items-center justify-between px-[1.4rem] py-[1rem] border-l-[1px] border-r-[1px] border-secondary10">
                <div className="opacity-[0.8] text-[1.3rem]">
                    {inputTokenCount}/{modelLength}
                </div>
                <div className="flex items-center gap-[10px]">
                    <div className="w-[130px]">
                        <Field
                            name="temperature"
                            render={({ input }) => (
                                <Select
                                    {...input}
                                    options={temperatureList}
                                    label="Temperature"
                                    id={input.name}
                                    fullWidth
                                    size="small"
                                />
                            )}
                        />
                    </div>
                    <Button
                        variant="contained"
                        disabled={!queryInput.value || isGenerateButtonLoading}
                        color="primary"
                        type="submit"
                        endIcon={
                            isGenerateButtonLoading ? (
                                <CircularLoader size={20} height="20px" color={theme.colors.white} />
                            ) : (
                                ''
                            )
                        }
                    >
                        Generate
                    </Button>
                </div>
            </div>

            <Dialog
                open={addPromptDialogVisible}
                onClose={() => setAddPromptDialogVisible(false)}
                title="Create Prompt"
            >
                <AddUpdatePrompt
                    onClose={(e: boolean) => handleAdddPromptDialogClose(e)}
                    selectedData={undefined}
                    description={queryInput.value}
                />
            </Dialog>
        </>
    );
};

export default TextAreaWithGenerate;
