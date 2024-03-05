import { GridValueFormatterParams } from '@mui/x-data-grid';
import DateFnsManager from '../../../../services/utils/DateFnsManager';
import { useTranslation } from 'react-i18next';
import { ColumnsProps } from '../../../../components/dto/ColumnsProps';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NotesButton } from '../../components/notes/components/NotesButton';
import { CONFIG_CONST } from '../../config/configOption/const/configConst';
import React from 'react';
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

export const ColumnsAccountsPayable = () => {
  const { t } = useTranslation();
  // const theme = useTheme();
  // const classes = sgUseStyles;
  // console.log(76, classes);

  const columns: ColumnsProps[] = [
    {
      field: 'id',
      headerName: `${t('ID')}`,
      flex: 30,
      // headerClassName: 'bg-header-secondary',
    },
    { field: 'reference', headerName: `${t('reference')}`, flex: 60 },
    { field: 'amount', headerName: `${t('amount')}`, flex: 70 },
    { field: 'amountPaid', headerName: `${t('amount_paid')}`, flex: 70 },
    {
      field: 'paid',
      headerName: `${t('paid')}`,
      flex: 50,
      type: 'boolean',
      valueFormatter: (params: GridValueFormatterParams) => {
        if (params.value == null) {
          return '';
        }
        return params.value ? `${t('paid')}` : `${t('pending')}`;
      },
    },
    {
      field: 'provider',
      headerName: `${t('provider')}`,
      flex: 50,
      valueFormatter: (params: GridValueFormatterParams) => {
        if (params.value == null) {
          return '';
        }
        return params.value.name || '';
      },
    },
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
      field: 'maxDateOfPay',
      headerName: `${t('max_date_of_day')}`,
      flex: 100,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value == null) {
          return '';
        }
        return dateManage.getFormatStandard(new Date(params.value));
      },
    },
    {
      field: 'note',
      headerName: `${t('note')}`,
      flex: 40,
      renderCell: (params) => {
        return (
          <NotesButton
            entityType={CONFIG_CONST.NOTE.ENTITY_SERVICE}
            entityId={params.row.id}
          />
        );
      },
    },
  ];
  return columns;
};
