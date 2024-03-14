import { Button } from '../Button';
import {
    StyledDialog,
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogContentText,
    StyledDialogTitle,
} from './ConfirmationPopup.styled';

type ConfirmationPopupProps = {
    open: boolean;
    title?: string;
    question?: string;
    okayButtonLabel?: string;
    isOkayButtonDisabled?: boolean;
    cancelButtonLabel?: string;
    onConfirmButtonClick: () => void;
    onCancelButtonClick: () => void;
    onClose: () => void;
    minWidth?: string;
};

export const ConfirmationPopup = ({
    onCancelButtonClick,
    onClose,
    onConfirmButtonClick,
    cancelButtonLabel = 'Cancel',
    okayButtonLabel = 'Okay',
    isOkayButtonDisabled = false,
    question = 'Are you sure want to exit? Are you sure want to exit? Are you sure want to exit?',
    title = 'Confirmation',
    open,
    minWidth = '400px',
}: ConfirmationPopupProps) => {
    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            minWidth={minWidth}
        >
            <StyledDialogTitle id="alert-dialog-title">{title}</StyledDialogTitle>
            <StyledDialogContent>
                <StyledDialogContentText id="alert-dialog-description">{question}</StyledDialogContentText>
            </StyledDialogContent>
            <StyledDialogActions>
                <Button onClick={onCancelButtonClick}>{cancelButtonLabel}</Button>
                <Button onClick={onConfirmButtonClick} disabled={isOkayButtonDisabled} variant="contained" autoFocus>
                    {okayButtonLabel}
                </Button>
            </StyledDialogActions>
        </StyledDialog>
    );
};
