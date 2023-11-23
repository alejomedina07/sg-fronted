import * as React from 'react';
import useNotes from '../redux/hooks/useNotes';
import { t } from 'i18next';
import { Dialog, DialogContent } from '@mui/material';
import { FormNotes } from './FormNotes';
import { ListNotes } from './ListNotes';
import { SgTransition } from '../../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../../components/utils/dialogs/SgDialogTitle';

export const DialogNotes = () => {
  const { isOpenModalNotes, onClose, closeModalNotesAction } = useNotes();

  const closeDialog = () => {
    if (onClose) onClose();
    else closeModalNotesAction();
  };

  const handleClose = () => {
    closeDialog();
  };

  return (
    <div className="w-full sm:w-auto sm:max-w-sm bg-white p-4">
      <Dialog
        onClose={handleClose}
        open={isOpenModalNotes}
        fullWidth
        maxWidth={'md'}
        TransitionComponent={SgTransition}
      >
        <SgDialogTitle id={'notes-dialog'} onClose={closeDialog}>
          {t('notes')}
        </SgDialogTitle>
        <DialogContent dividers className="!p-0">
          <FormNotes />
          <ListNotes />
        </DialogContent>
      </Dialog>
    </div>
  );
};
