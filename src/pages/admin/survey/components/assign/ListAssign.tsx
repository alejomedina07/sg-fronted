import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ListAssignProps {
  users: any[];
}

export const ListAssign = (props: ListAssignProps) => {
  const { users } = props;
  const { t } = useTranslation();
  return (
    <>
      <i>Esta es la lista de asignados</i>
      <TableContainer component={Paper}>
        <Table aria-label="assign table" size="small">
          <TableHead>
            <TableRow className="bg-blue-800 !text-blue-50">
              <TableCell className="!text-blue-50">{t('first_name')}</TableCell>
              <TableCell className="!text-blue-50">{t('last_name')}</TableCell>
              <TableCell className="!text-blue-50">
                {t('phone_number')}
              </TableCell>
              <TableCell className="!text-blue-50">{t('email')}</TableCell>
              <TableCell className="!text-blue-50">
                {t('document_number')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>

                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.documentNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
