import { styled } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export const StyledDialog = styled(Dialog)<{ minWidth: string }>`
  .MuiDialog-paper {
    min-width: ${({ minWidth }) => minWidth};
  }
`

export const StyledDialogActions = styled(DialogActions)`
  padding: 2rem 1.5rem 1.5rem;
`

export const StyledDialogContent = styled(DialogContent)``

export const StyledDialogContentText = styled(DialogContentText)`
  color: ${({theme}) => theme.colors.secondary}
`

export const StyledDialogTitle = styled(DialogTitle)`
  font-size: 2rem;
`
