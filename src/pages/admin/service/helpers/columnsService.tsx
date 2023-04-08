import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import {t}                                      from 'i18next';
import DateFnsManager                           from '../../../../services/utils/DateFnsManager';

const dateManage = new DateFnsManager()
export const ColumnsService: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 30 },
  { field: 'createdAt', headerName: `${t('created_at')}`, flex: 100,
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      if (params.value == null) {
        return '';
      }
      return dateManage.getFormatStandard(new Date(params.value));
    },
  },
  { field: 'amount', headerName: `${t('amount')}`, flex: 70, },
  { field: 'description', headerName: `${t('description')}`, flex: 70, },

];