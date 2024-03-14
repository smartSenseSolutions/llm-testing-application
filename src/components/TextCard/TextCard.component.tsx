import { useLayoutEffect, useRef, useState } from 'react';
import { FieldInputProps, Form } from 'react-final-form';
import { FormApi, FormState } from 'final-form';
import { Dialog, RichEditor } from '@patent-app/stories';
import { BrowsePrompt } from '../BrowsePrompt';
import TextAreaWithGenerate from '../TextAreaWithGenerate';
import { CardHeader } from '../CardHeader';
import { getAlert, useRefEquality } from '@patent-app/hooks';
import { ExpandedSection, KeyValueType, Model } from '@patent-app/types/Common.type';
import { DraftSections } from '@patent-app/types/Draft.type';
import { scrollExpandedBlock } from '@patent-app/utils/helpers/common.helper';
import {
    DEFAULT_TEMPERATURE,
    MODEL_TEXT_LENGTH,
    MODEL_TYPE,
    TEXT_DEFAULT_LIST,
} from '@patent-app/utils/constants/common.constant';
import { API_BASE_URL, ENDPOINTS } from '@patent-app/utils/constants/endpoints.constant';
import Icons from '@patent-app/icons';

type TextCardProps = {
    onToggleEvent: (type: ExpandedSection) => void;
    onMoveDataHandler: (sectionName: DraftSections, content: string) => void;
    isExpanded: boolean;
};

const TextCard = ({ onToggleEvent, onMoveDataHandler, isExpanded }: TextCardProps) => {
    const [data, setData] = useState<string>('');
    const [apiLoading, setApiLoading] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [resetTokenCount, setResetTokenCount] = useState(0);
    const initialValue = {
        target_model: MODEL_TYPE.LLAMA_70B,
        query: '',
        temperature: DEFAULT_TEMPERATURE,
    };

    const generatedText = useRefEquality({ generated_text: data });
    const formRef = useRef<FormApi<KeyValueType, Partial<KeyValueType>> | undefined>(undefined);

    useLayoutEffect(() => {
        if (isExpanded) {
            scrollExpandedBlock();
        }
    }, [isExpanded]);

    const onZoomHandler = () => {
        onToggleEvent('text');
    };

    const handleSubmit = (values: KeyValueType) => {
        if (values.target_model && values.query) {
            setApiLoading(true);
            setData('');

            fetch(`${API_BASE_URL}${ENDPOINTS.textGeneration}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    target_model: values?.target_model || '',
                    deployment_environment: 'vLLM',
                    max_new_tokens: 2048,
                    stream: true,
                    temperature: parseFloat(values?.temperature),
                    top_p: 0.95,
                    query: values?.query || '',
                    render_image: false,
                }),
            })
                .then((res) => {
                    if (res.body) {
                        const reader = res.body.getReader();

                        const read = () => {
                            reader
                                .read()
                                .then(({ done, value }) => {
                                    const decoder = new TextDecoder();
                                    if (done) {
                                        setApiLoading(false);
                                        return;
                                    }
                                    setData((prev: string) => `${prev}${decoder.decode(value)}`);
                                    read();
                                })
                                .catch(() => {
                                    setApiLoading(false);
                                });
                        };

                        read();
                    }
                })
                .catch(() => {
                    setApiLoading(false);
                });
        }
    };

    const onOpenDialog = () => {
        setIsOpenDialog(true);
    };

    const onCloseDialog = () => {
        setIsOpenDialog(false);
    };

    const onUseContentFunc = (data: string) => {
        setIsOpenDialog(false);
        if (formRef.current) {
            formRef.current?.change('query', data);
            setResetTokenCount((prev) => prev + 1);
        }
    };

    const handleModelChange = (input: FieldInputProps<string>, value: string) => {
        input.onChange(value);

        const formState: FormState<KeyValueType, Partial<KeyValueType>> | undefined = formRef.current?.getState();
        if (formState) {
            if (formState.values?.query?.length > MODEL_TEXT_LENGTH[value]) {
                formRef.current?.change('query', '');
            }
            setResetTokenCount((prev) => prev + 1);
        }
        if (value === MODEL_TYPE.GPT_4) {
            getAlert('info', 'Do not use confidential data with GPT-4');
        }
    };

    return (
        <Form
            onSubmit={handleSubmit}
            initialValues={initialValue}
            render={({ handleSubmit, form, values }) => {
                formRef.current = form;
                return (
                    <form onSubmit={handleSubmit}>
                        <CardHeader
                            icon={<Icons.Text />}
                            title="TEXT"
                            isExpanded={isExpanded}
                            onZoomHandler={onZoomHandler}
                            onBrowsePromptClick={onOpenDialog}
                            onSelectOptionChange={handleModelChange}
                            options={TEXT_DEFAULT_LIST}
                        />

                        <>
                            <TextAreaWithGenerate
                                isGenerateButtonLoading={apiLoading}
                                model={values.target_model as Model}
                                resetTokenCount={resetTokenCount}
                            />

                            <RichEditor
                                data={generatedText?.generated_text ? generatedText : { generated_text: '' }}
                                renderImg={false}
                                onMoveData={onMoveDataHandler}
                                isMoveToMenu={true}
                            />
                        </>

                        <Dialog open={isOpenDialog} onClose={onCloseDialog} title={'Browse Prompt'}>
                            <BrowsePrompt onUseContent={(e: string) => onUseContentFunc(e)} />
                        </Dialog>
                    </form>
                );
            }}
        />
    );
};

export { TextCard };
