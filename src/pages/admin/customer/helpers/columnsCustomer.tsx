import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import DateUtils                                from '../../../../services/utils/DateUtils';
import { t }                      from 'i18next';

const { formatDate, FORMATS_DATE } = DateUtils;

export const ColumnsCustomer: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 30 },
  { field: 'name', headerName: `${t('name')}`, flex: 100},
  { field: 'bloodType', headerName: `${t('blood_type')}`, flex: 70, },
  { field: 'document', headerName: `${t('document')}` , flex: 100,
    renderCell: (params) => { // TODO cambio en el backend
      return (<span> <strong> { params.row?.documentType?.name || '' }:</strong> { params.row.document }</span>)
    },
  },
  { field: 'phoneNumber', headerName: t('phone_number') || undefined, flex: 70, },

  { field: 'address', headerName: `${t('address')}` , flex: 100, editable:true },
  { field: 'createdAt', headerName: `${t('created_at')}` , flex: 100,
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      if (params.value == null) {
        return '';
      }
      return formatDate(params.value, FORMATS_DATE.MM_DD_YYYY);
    },
  },
];
