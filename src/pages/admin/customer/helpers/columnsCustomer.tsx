import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import DateUtils                                from '../../../../services/utils/DateUtils';

const { formatDate, FORMATS_DATE } = DateUtils;

export const ColumnsCustomer: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 30 },
  { field: 'name', headerName: 'Nombre', flex: 100},
  { field: 'bloodType', headerName: 'Tipo de sangre', flex: 70, },
  { field: 'document', headerName: 'Documento', flex: 100,
    renderCell: (params) => { // TODO cambio en el backend
      return (<span> <strong> { params.row?.documentType?.name || '' }:</strong> { params.row.document }</span>)
    },
  },
  { field: 'phoneNumber', headerName: 'Teléfono', flex: 70, },

  { field: 'address', headerName: 'Dirección', flex: 100, editable:true },
  { field: 'createdAt', headerName: 'Fecha de Creación', flex: 100,
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      if (params.value == null) {
        return '';
      }
      return formatDate(params.value, FORMATS_DATE.MM_DD_YYYY);
    },
  },
];
