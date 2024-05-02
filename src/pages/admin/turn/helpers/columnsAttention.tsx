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

export const ColumnsAttention = () => {
  const { t } = useTranslation();
  const columns: ColumnsProps[] = [
    // {
    //   field: 'id',
    //   headerName: `${t('ID')}`,
    //   flex: 30,
    // },
    {
      field: 'typeTurnId',
      headerName: `${t('room')}`,
      flex: 60,
      valueGetter: (params: any) => {
        return `${params.row.typeTurn?.name}`;
      },
    },
    {
      field: 'fullName',
      headerName: `${t('name')}`,
      flex: 60,
      valueGetter: (params: any) => {
        return `${params.row.turn?.fullName}`;
      },
    },
    {
      field: 'company',
      headerName: `${t('company')}`,
      flex: 70,
      valueGetter: (params: any) => {
        return `${params.row.turn?.company}`;
      },
    },
    {
      field: 'document',
      headerName: `${t('document')}`,
      flex: 70,
      valueGetter: (params: any) => {
        return `${params.row.turn?.document}`;
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
        return dateManage.getFormatStandard(new Date(params.value), true);
      },
      disableColumnMenu: true,
    },
    {
      field: 'attendedAt',
      headerName: `${t('attended')}`,
      flex: 70,
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
      flex: 70,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value == null) {
          return '';
        }
        return dateManage.getFormatStandard(new Date(params.value), true);
      },
      disableColumnMenu: true,
    },
  ];
  return columns;
};
