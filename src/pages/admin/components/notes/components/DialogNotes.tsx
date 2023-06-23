import useNotes from '../redux/hooks/useNotes';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { SgTransition } from '../../../../../components/utils/dialogs/SgTransition';
import { t } from 'i18next';
import { SgDialogTitle } from '../../../../../components/utils/dialogs/SgDialogTitle';
import { FormNotes } from '../FormNotes';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ListNotes } from './ListNotes';
import { useGetNotesQuery } from '../notesApi';

export const DialogNotes = () => {
  const { isOpenModalNotes, onClose, refresh, closeModalNotesAction } =
    useNotes();

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
          {' '}
          {/* sx={{ minHeight: '240px' }} */}
          <FormNotes />
          <ListNotes />
        </DialogContent>
      </Dialog>
    </div>
  );
};
