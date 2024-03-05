import { GridValueFormatterParams } from '@mui/x-data-grid';
import DateFnsManager from '../../../../services/utils/DateFnsManager';
import { useTranslation } from 'react-i18next';
import { ColumnsProps } from '../../../../components/dto/ColumnsProps';
// import { createStyles, makeStyles, useTheme } from '@mui/material';
// import { Theme } from '@mui/material/styles';
//
// export const sgUseStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     bgSecondaryMain: {
//       backgroundColor: theme.palette.secondary.main,
//       // Otras propiedades de estilo que desees añadir
//     },
//   })
// );

const dateManage = new DateFnsManager();

export const ColumnsPayment = () => {
  const { t } = useTranslation();
  const columns: ColumnsProps[] = [
    {
      field: 'id',
      headerName: `${t('ID')}`,
      flex: 30,
    },
    { field: 'amount', headerName: `${t('amount')}`, flex: 70 },
    { field: 'reference', headerName: `${t('reference')}`, flex: 60 },
    { field: 'method', headerName: `${t('method')}`, flex: 70 },
    {
      field: 'createdAt',
      headerName: `${t('created_at')}`,
      flex: 70,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value == null) {
          return '';
        }
        return dateManage.getFormatStandard(new Date(params.value));
      },
    },
    {
      field: 'createdBy',
      headerName: `${t('created_by')}`,
      flex: 100,
      valueGetter: (params: any) => {
        return (
          params.row.createdBy?.firstName + ' ' + params.row.createdBy?.lastName
        );
      },
    },
  ];
  return columns;
};
