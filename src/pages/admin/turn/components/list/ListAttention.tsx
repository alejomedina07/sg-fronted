import { SgTransition } from '../../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../../components/utils/dialogs/SgDialogTitle';
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
import { Person } from '../../dto/Person';
import { SgButton } from '../../../../../components/form/button/SgButton';
import DateFnsManager from '../../../../../services/utils/DateFnsManager';
import { useGetAttentionQuery } from '../../redux/api/turnApi';
import { useTranslation } from 'react-i18next';

const dateManage = new DateFnsManager();

interface ListAttentionProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  turn: any;
}
export const ListAttention = (props: ListAttentionProps) => {
  const { isOpen, setIsOpen, turn } = props;
  const { t } = useTranslation();
  const { data, isLoading } = useGetAttentionQuery(turn?.id || 0);

  console.log(1234, turn);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      maxWidth={'lg'}
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
            {t('name')}: <b> {turn.fullName} </b>{' '}
          </span>
          <span className="flex-1 mx-1">
            {t('created_by')}:{' '}
            <b>
              {' '}
              {turn.createdBy?.firstName + ' ' + turn.createdBy?.lastName}{' '}
            </b>{' '}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <span className="flex-1 mx-1">
            {t('company')}: <b> {turn.company} </b>{' '}
          </span>
          <span className="flex-1 mx-1">
            {t('document_number')}: <b> {turn.document} </b>{' '}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <span className="flex-1 mx-1">
            {t('note')}: <b> {turn.note} </b>{' '}
          </span>
        </div>
        <span className="flex flex-row items-center !my-4">
          <b>{t('type_turn')}:</b>
        </span>
        {!!isLoading && <i>cargando</i>}
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="!font-bold" align="left">
                  {t('room')}
                </TableCell>
                <TableCell className="!font-bold" align="right">
                  {t('attended_by')}
                </TableCell>
                <TableCell className="!font-bold" align="right">
                  {t('total')}
                </TableCell>

                <TableCell className="!font-bold" align="right">
                  {t('started_at')}
                </TableCell>
                <TableCell className="!font-bold" align="right">
                  {t('finish_at')}
                </TableCell>
                <TableCell className="!font-bold" align="right">
                  {t('description')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((item: any) => (
                <>
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="item">
                      {item.typeTurn?.name}
                    </TableCell>
                    <TableCell align="right">
                      {item.attentBy
                        ? item.attentBy?.firstName +
                          ' ' +
                          item.attentBy?.lastName
                        : ''}
                    </TableCell>
                    <TableCell align="right">
                      {item.totalTime || 0} {t('minutes')}{' '}
                    </TableCell>

                    <TableCell align="right">
                      {item.createdAt
                        ? dateManage.getFormatStandard(
                            new Date(item.createdAt),
                            true
                          )
                        : ''}
                    </TableCell>
                    <TableCell align="right">
                      {item.finishAt
                        ? dateManage.getFormatStandard(
                            new Date(item.finishAt),
                            true
                          )
                        : ''}
                    </TableCell>
                    <TableCell align="right">{item.description}</TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};
