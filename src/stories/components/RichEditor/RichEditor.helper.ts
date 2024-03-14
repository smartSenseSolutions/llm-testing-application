import { convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { EditorState } from 'react-draft-wysiwyg';

export const convertDraftToHTML = (editorState: EditorState) => {
    return stateToHTML(editorState.getCurrentContent());
};

export const convertDraftToMarkdown = (editorState: EditorState) => {
    return draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
};

export const convertMarkdownToDraft = (content: string) => {
    return markdownToDraft(content);
};

export const richTextAreaActionButtonClassName = 'richTextAreaActionButton';
