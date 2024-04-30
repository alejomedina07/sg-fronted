import { SgButton } from '../../../../../components/form/button/SgButton';
import React, { useState } from 'react';
import { Person } from '../../dto/Person';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  LinearProgress,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { SgTransition } from '../../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../../components/utils/dialogs/SgDialogTitle';
import { useGetCountTurnTypesQuery } from '../../redux/api/turnApi';
import { LoadingTurn } from '../shared/LoadingTurn';

interface ConfigInfoProps {
  turnSelected: Person | undefined;
  handleDeleteConfig: () => void;
  config: any;
}

export const ConfigInfo = (props: ConfigInfoProps) => {
  const { turnSelected, handleDeleteConfig, config } = props;
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetCountTurnTypesQuery(isOpen);

  return (
    <>
      <div className="flex flex-row items-center justify-between !bg-white p-2">
        <b> {config.roomAppointMent || t('reception')} </b>
        <span>
          {!!config.reception && (
            <SgButton
              classes="!mr-4"
              variant="outlined"
              color="info"
              onClickAction={() => setIsOpen(true)}
              label={t('view_rooms')}
            />
          )}
          <SgButton
            variant="outlined"
            color="error"
            onClickAction={handleDeleteConfig}
            label={t('delete_config')}
            disabled={!!turnSelected?.id}
          />
        </span>
      </div>
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
          {t('view_rooms')}
        </SgDialogTitle>
        <DialogContent dividers>
          {!!isLoading && <LoadingTurn />}
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">{t('room')}</TableCell>
                  <TableCell align="left">{t('type_turn')}</TableCell>
                  <TableCell align="left">{t('quantity')}</TableCell>
                  <TableCell align="left">{t('average')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data.map((type: any) => (
                  <TableRow
                    key={type.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="type">
                      {type.room}
                    </TableCell>
                    <TableCell component="th" scope="type">
                      {type.type}
                    </TableCell>
                    <TableCell component="th" scope="type">
                      {type.quantity}
                    </TableCell>
                    <TableCell component="th" scope="type">
                      {type.average} {t('minutes')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};
