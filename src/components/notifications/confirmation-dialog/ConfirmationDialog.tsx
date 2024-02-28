import useDialogs from '../../../store/hooks/dialogs/useDialogs';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { t } from 'i18next';

export const ConfirmationDialog = () => {
  const {
    message,
    onConfirm,
    dialogStatus,
    onClose,
    title,
    closeConfirmationDialog,
  } = useDialogs();

  const handleCancel = () => {
    closeConfirmationDialog();
    if (onClose) onClose();
  };

  const handleOk = () => {
    closeConfirmationDialog();
    onConfirm();
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={dialogStatus}
    >
      <DialogTitle color="red">{title}</DialogTitle>
      <DialogContent dividers>{message}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          {t('no')}
        </Button>
        <Button onClick={handleOk} color="error">
          {t('yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
