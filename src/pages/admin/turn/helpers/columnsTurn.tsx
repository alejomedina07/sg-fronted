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

export const ColumnsTurn = () => {
  const { t } = useTranslation();
  // const theme = useTheme();
  // const classes = sgUseStyles;
  // console.log(76, classes);

  const columns: ColumnsProps[] = [
    {
      field: 'id',
      headerName: `${t('ID')}`,
      flex: 20,
      // headerClassName: 'bg-header-secondary',
    },
    { field: 'fullName', headerName: `${t('name')}`, flex: 70 },
    { field: 'company', headerName: `${t('company')}`, flex: 70 },
    { field: 'document', headerName: `${t('document')}`, flex: 50 },
    { field: 'entryTime', headerName: `${t('entry_time')}`, flex: 40 },
    {
      field: 'createdAt',
      headerName: `${t('created_at')}`,
      flex: 60,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value == null) {
          return '';
        }
        return dateManage.getFormatStandard(new Date(params.value), true);
      },
      disableColumnMenu: true,
    },
    {
      field: 'finishAt',
      headerName: `${t('finish_at')}`,
      flex: 60,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value == null) {
          return '';
        }
        return dateManage.getFormatStandard(new Date(params.value), true);
      },
      disableColumnMenu: true,
    },
    // {
    //   field: 'note',
    //   headerName: `${t('note')}`,
    //   flex: 40,
    //   renderCell: (params) => {
    //     return (
    //       <NotesButton
    //         entityType={CONFIG_CONST.NOTE.ENTITY_SERVICE}
    //         entityId={params.row.id}
    //       />
    //     );
    //   },
    // },
  ];
  return columns;
};
