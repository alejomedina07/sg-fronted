import { SgTransition } from '../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../components/utils/dialogs/SgDialogTitle';
import { t } from 'i18next';
import {
  Dialog,
  DialogContent,
  Paper,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableBody,
} from '@mui/material';
import React from 'react';
import { Person } from '../dto/Person';
import { SgButton } from '../../../../components/form/button/SgButton';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DateFnsManager from '../../../../services/utils/DateFnsManager';

const dateManage = new DateFnsManager();

interface ViewTurnProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  turn: Person;
  deleteTurn?: (person: Person) => void;
}
export const ViewTurn = (props: ViewTurnProps) => {
  const { isOpen, setIsOpen, turn, deleteTurn } = props;

  const handleDeleteTurn = () => {
    if (deleteTurn) deleteTurn(turn);
  };

  console.log(9898989898, turn);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      maxWidth={'md'}
      TransitionComponent={SgTransition}
      className="!p-4"
    >
      <SgDialogTitle
        id={'CallTurnComponent-dialog'}
        onClose={() => setIsOpen(false)}
      >
        {t('view_turn')}
      </SgDialogTitle>
      <DialogContent dividers>
        <div className="flex flex-row items-center">
          <span className="flex-1 mx-1">
            {t('name')}: <b> {turn.name} </b>{' '}
          </span>
          <SgButton
            variant="contained"
            color="error"
            label={t('delete')}
            onConfirm={handleDeleteTurn}
            confirmationTitle={`${t('confirmation_title_delete_turn')}`}
            confirmationMessage={`${t('confirmation_message_delete_turn')}`}
            // sending={isLoading}
          />
        </div>
        <div className="flex flex-row items-center">
          <span className="flex-1 mx-1">
            {t('company')}: <b> {turn.company} </b>{' '}
          </span>
          <span className="flex-1 mx-1">
            {t('document_number')}: <b> {turn.document} </b>{' '}
          </span>
        </div>

        <span className="flex flex-row items-center !my-4">
          <b>{t('type_turn')}:</b>
        </span>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">{t('name')}</TableCell>
                <TableCell align="right">{t('attended')}</TableCell>
                <TableCell align="right">{t('attended_by')}</TableCell>
                <TableCell align="right">{t('started_at')}</TableCell>
                <TableCell align="right">{t('finish_at')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {turn.typeTurns.map((type: any) => (
                <TableRow
                  key={type.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="type">
                    {type.name}
                  </TableCell>
                  <TableCell align="right">
                    {type.attended ? <DoneAllIcon /> : <DoNotDisturbIcon />}
                  </TableCell>
                  <TableCell align="right">{type.takeBy?.name}</TableCell>
                  <TableCell align="right">
                    {type.startedAt
                      ? dateManage.getFormatStandard(
                          new Date(type.startedAt),
                          true
                        )
                      : ''}
                  </TableCell>
                  <TableCell align="right">
                    {type.finishAt
                      ? dateManage.getFormatStandard(
                          new Date(type.finishAt),
                          true
                        )
                      : ''}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};
