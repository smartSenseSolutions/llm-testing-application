import { useRef, useState } from 'react';
import { FieldInputProps, Form } from 'react-final-form';
import { FormApi, FormState } from 'final-form';
import { Dialog, RichEditor } from '@patent-app/stories';
import { BrowsePrompt } from '../BrowsePrompt';
import TextAreaWithGenerate from '../TextAreaWithGenerate';
import { CardHeader } from '../CardHeader';
import { getAlert } from '@patent-app/hooks';
import { GenerateResponse } from '@patent-app/apis/Generation.api';
import { ExpandedSection, KeyValueType, Model } from '@patent-app/types/Common.type';
import {
    DEFAULT_TEMPERATURE,
    MODEL_TEXT_LENGTH,
    MODEL_TYPE,
    TEXT_DEFAULT_LIST,
} from '@patent-app/utils/constants/common.constant';
import Icons from '@patent-app/icons';
import { GenerationApi } from '@patent-app/apis';

type FigureCardProps = {
    onToggleEvent: (sectionName: ExpandedSection) => void;
    isExpanded: boolean;
};

const FigureCard = ({ onToggleEvent, isExpanded }: FigureCardProps) => {
    const [data, setData] = useState<GenerateResponse>({
        base64_text: '',
        generated_text: '',
        svg_parsed_text: '',
    });
    const [disable, setDisable] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [resetTokenCount, setResetTokenCount] = useState(0);
    const formRef = useRef<FormApi<KeyValueType, Partial<KeyValueType>> | undefined>(undefined);
    const initialValue = {
        target_model: MODEL_TYPE.GPT_4,
        query: '',
        temperature: DEFAULT_TEMPERATURE,
    };

    const onZoomHandler = () => {
        onToggleEvent('figure');
    };

    const handleSubmit = (values: KeyValueType) => {
        if (values.target_model && values.query) {
            setData({
                base64_text: '',
                generated_text: '',
                svg_parsed_text: '',
            });

            const params = {
                target_model: values?.target_model || '',
                deployment_environment: 'vLLM',
                max_new_tokens: 2048,
                stream: true,
                temperature: parseFloat(values?.temperature),
                top_p: 0.95,
                query: values?.query || '',
                render_image: true,
            };
            setDisable(true);
            GenerationApi.getImage(params)
                .then((res) => {
                    if (res) {
                        setData({
                            base64_text: res.payload.base64_text,
                            generated_text: res.payload.generated_images,
                            svg_parsed_text: res.payload.svg_parsed_text,
                        });
                        setDisable(false);
                    }
                })
                .catch((e) => {
                    console.log('Error =>', e);
                    setDisable(false);
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
                            icon={<Icons.Figure />}
                            title="FIGURE"
                            isExpanded={isExpanded}
                            onZoomHandler={onZoomHandler}
                            onBrowsePromptClick={onOpenDialog}
                            onSelectOptionChange={handleModelChange}
                            options={TEXT_DEFAULT_LIST.filter(
                                (model) => model.value !== MODEL_TYPE.LLAMA_70B,
                            ).reverse()}
                        />

                        <>
                            <TextAreaWithGenerate
                                isGenerateButtonLoading={disable}
                                model={values?.target_model as Model}
                                resetTokenCount={resetTokenCount}
                            />

                            <RichEditor data={data} renderImg={true} />
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

export { FigureCard };
