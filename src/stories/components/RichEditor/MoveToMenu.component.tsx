import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ActionButton } from '@patent-app/components';
import { DraftSections } from '@patent-app/types/Draft.type';
import { SECTION_LIST } from '@patent-app/utils/constants/common.constant';
import { richTextAreaActionButtonClassName } from './RichEditor.helper';
import Icons from '@patent-app/icons';

type MoveToMenusProps = {
    onMoveData: (sectionName: DraftSections) => void;
    disabled: boolean;
};

const MoveToMenus = ({ onMoveData, disabled }: MoveToMenusProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick: React.ComponentProps<'button'>['onClick'] = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMoveData = (sectionName: DraftSections) => {
        onMoveData(sectionName);
        handleClose();
    };

    return (
        <div>
            <ActionButton
                icon={<Icons.MoveTo />}
                disabled={disabled}
                onClick={handleClick}
                title="Move To"
                className={richTextAreaActionButtonClassName}
            />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {SECTION_LIST.map((section) => (
                    <MenuItem
                        key={section.key}
                        onClick={() => handleMoveData(section.key as unknown as DraftSections)}
                        disabled={disabled}
                    >
                        <span className="pl-[1rem]">{section.label}</span>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export { MoveToMenus };
