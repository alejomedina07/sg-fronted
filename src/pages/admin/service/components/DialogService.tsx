import useService from '../redux/hooks/useService';
import { SgDialogTitle } from '../../../../components/utils/dialogs/SgDialogTitle';
import { SgTransition } from '../../../../components/utils/dialogs/SgTransition';
import { Dialog, DialogContent } from '@mui/material';
import { FormService } from '../views/FormService';
import { t } from 'i18next';

export const DialogService = () => {
  const {
    isOpenModalService,
    onClose,
    refresh,
    closeModalServiceAction,
    service,
  } = useService();

  const handleClose = () => {
    closeDialog();
  };

  const closeDialog = () => {
    if (onClose) onClose();
    else closeModalServiceAction();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={isOpenModalService}
      fullWidth
      maxWidth={'md'}
      TransitionComponent={SgTransition}
    >
      <SgDialogTitle id={'appointment-dialog'} onClose={closeDialog}>
        {' '}
        {t(service?.id ? 'edit_service' : 'create_service')}{' '}
      </SgDialogTitle>
      <DialogContent dividers>
        <FormService />
      </DialogContent>
    </Dialog>
  );
};
