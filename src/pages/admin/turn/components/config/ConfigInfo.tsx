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
import { SgLink } from '../../../../../components/form/button/SgLink';

interface ConfigInfoProps {
  turnSelected: Person | undefined;
  handleDeleteConfig: () => void;
  config: any;
  connected: boolean;
}

export const ConfigInfo = (props: ConfigInfoProps) => {
  const { turnSelected, handleDeleteConfig, config, connected } = props;
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetCountTurnTypesQuery(isOpen);

  return (
    <>
      <div className="flex flex-row items-center justify-between !bg-white p-2">
        <b> {config.roomAppointMent || t('reception')} </b>
        <span
          className={`h-4 w-4 rounded-full ${
            connected ? 'bg-green-500' : 'bg-gray-500'
          }`}
        ></span>
        <span>
          {!!config.reception && (
            <SgButton
              variant="outlined"
              color="info"
              onClickAction={() => setIsOpen(true)}
              label={t('view_rooms')}
            />
          )}
          {!!config.typeTurnId && !turnSelected?.id && (
            <SgLink
              label={t('view_attentions')}
              to={`/admin/attentions?typeTurnId=${config.typeTurnId}`}
            />
          )}
          <SgButton
            classes="!ml-4"
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
                  {/* <TableCell align="left">{t('type_turn')}</TableCell> */}
                  <TableCell align="left">{t('pending')}</TableCell>
                  <TableCell align="left">{t('attended')}</TableCell>
                  <TableCell align="left">{t('total')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data?.map((type: any) => (
                  <TableRow
                    key={type.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="type">
                      {type.room}
                    </TableCell>
                    {/* <TableCell component="th" scope="type"> */}
                    {/*   {type.type} */}
                    {/* </TableCell> */}
                    <TableCell component="th" scope="type">
                      {type.pending}
                    </TableCell>
                    <TableCell component="th" scope="type">
                      {type.attended}
                    </TableCell>
                    <TableCell component="th" scope="type">
                      {type.total}
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
