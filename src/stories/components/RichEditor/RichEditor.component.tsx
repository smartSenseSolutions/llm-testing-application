import { useCallback, useEffect, useRef, useState } from 'react';
import { Editor, EditorProps } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import { ExportMenus } from './ExportMenu.component';
import { MoveToMenus } from './MoveToMenu.component';
import { ActionButton } from '@patent-app/components';
import { DraftSections } from '@patent-app/types/Draft.type';
import { convertDraftToMarkdown, convertMarkdownToDraft, richTextAreaActionButtonClassName } from './RichEditor.helper';
import { copyHandler } from '@patent-app/utils/helpers/common.helper';
import Icons from '@patent-app/icons';
import { GenerateResponse } from '@patent-app/apis/Generation.api';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './RichEditor.scss';

type RichEditorProps = EditorProps & {
    data: GenerateResponse;
    renderImg?: boolean;
    isMoveToMenu?: boolean;
    onMoveData?: (sectionName: DraftSections, content: string) => void;
};

const RichEditor = ({
    data,
    renderImg = false,
    isMoveToMenu = false,
    onMoveData = () => {},
    ...props
}: RichEditorProps) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editorStateRef = useRef<EditorState>(EditorState.createEmpty());
    const [isCustomToolBarDisabled, setIsCustomToolBarDisabled] = useState(true);

    useEffect(() => {
        if (!editorStateRef.current.getCurrentContent().getPlainText()) {
            setIsCustomToolBarDisabled(true);
        } else {
            setIsCustomToolBarDisabled(false);
        }
    }, [editorStateRef.current]);

    useEffect(() => {
        if (data?.generated_text) {
            const rawObject = convertMarkdownToDraft(data?.generated_text);
            const draftData = convertFromRaw(rawObject);
            const updatedEditorState = EditorState.createWithContent(draftData);
            setEditorState(updatedEditorState);
            editorStateRef.current = updatedEditorState;
        }
    }, [data]);

    const onEditorStateChange = (editorState: EditorState) => {
        editorStateRef.current = editorState;
        setEditorState(editorState);
    };

    const CustomOption = useCallback(() => {
        const copyDataHandler = async () => {
            copyHandler(convertDraftToMarkdown(editorStateRef.current));
        };

        const downloadSVGHandler = () => {
            if (data.svg_parsed_text) {
                const blob = new Blob([data.svg_parsed_text], { type: 'image/svg+xml' });

                // Create a download link
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'icon.svg'; // Set the desired file name

                // Append the link to the document and trigger the download
                document.body.appendChild(link);
                link.click();

                // Clean up by removing the link and revoking the object URL
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            }
        };

        return (
            <div className="flex gap-[8px] !order-1 mb-[1rem] w-full py-[1rem] px-[1.4rem] border-b border-secondary10">
                {renderImg ? (
                    <ActionButton
                        disabled={!(data.svg_parsed_text && !isCustomToolBarDisabled)}
                        onClick={downloadSVGHandler}
                        title="Download SVG"
                        icon={<Icons.Download height={15} />}
                        className={richTextAreaActionButtonClassName}
                    />
                ) : null}
                <ActionButton
                    disabled={isCustomToolBarDisabled}
                    onClick={copyDataHandler}
                    title="Copy"
                    icon={<Icons.Copy />}
                    className={richTextAreaActionButtonClassName}
                />

                <ExportMenus editorStateRef={editorStateRef} disabled={isCustomToolBarDisabled} />

                {isMoveToMenu ? (
                    <MoveToMenus
                        disabled={isCustomToolBarDisabled}
                        onMoveData={(sectionName: DraftSections) =>
                            onMoveData(sectionName, convertDraftToMarkdown(editorStateRef.current))
                        }
                    />
                ) : null}

                <ActionButton
                    title="Clear"
                    icon={<Icons.Clean />}
                    onClick={() => {
                        setEditorState(EditorState.createEmpty());
                        editorStateRef.current = EditorState.createEmpty();
                    }}
                    disabled={isCustomToolBarDisabled}
                    className={richTextAreaActionButtonClassName}
                    wrapperClassName="ml-[auto]"
                />
            </div>
        );
    }, [data, isCustomToolBarDisabled]);

    return (
        <>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                toolbarCustomButtons={[<CustomOption />]}
                toolbar={{
                    image: { previewImage: true },
                    alt: { present: true, mandatory: true },
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'history'],
                    inline: {
                        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                    },
                }}
                handlePastedText={() => false}
                {...props}
            />
        </>
    );
};

export { RichEditor };
