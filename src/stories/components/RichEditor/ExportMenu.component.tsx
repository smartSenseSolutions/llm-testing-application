import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { EditorState } from 'draft-js';
import { ActionButton } from '@patent-app/components';
import { convertDraftToHTML, richTextAreaActionButtonClassName } from './RichEditor.helper';
import { generateAndDownloadFromHTMLFile } from '@patent-app/utils/helpers/common.helper';
import { MIME_TYPE } from '@patent-app/utils/constants/common.constant';
import Icons from '@patent-app/icons';

type ExportMenusProps = {
    editorStateRef: React.MutableRefObject<EditorState>;
    disabled: boolean;
};

type FileType = 'rtf' | 'doc';

type FileItem = {
    label: string;
    value: FileType;
};

const exportFileType: FileItem[] = [
    {
        label: 'RTF',
        value: 'rtf',
    },
    {
        label: 'DOC',
        value: 'doc',
    },
];

const ExportMenus = ({ editorStateRef, disabled }: ExportMenusProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (type: 'doc' | 'rtf') => {
        const content = convertDraftToHTML(editorStateRef.current);
        const mimeType = type === 'doc' ? MIME_TYPE.MSWORD : MIME_TYPE.RTF;
        const fileNameWithExtension = type === 'doc' ? 'document.doc' : 'file.rtf';
        generateAndDownloadFromHTMLFile(content, mimeType, fileNameWithExtension);
        handleClose();
    };

    return (
        <div>
            <ActionButton
                icon={<Icons.Export />}
                onClick={handleClick}
                title="Export"
                className={richTextAreaActionButtonClassName}
                disabled={disabled}
            />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {exportFileType.map((file) => (
                    <MenuItem key={file.value} onClick={() => handleMenuItemClick(file.value)} disabled={disabled}>
                        <Icons.Export /> <span className="pl-[1rem]">{file.label}</span>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export { ExportMenus };
