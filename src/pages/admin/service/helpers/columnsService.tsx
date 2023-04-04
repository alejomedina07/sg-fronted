import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import DateUtils                                from '../../../../services/utils/DateUtils';

const { formatDate, FORMATS_DATE } = DateUtils;

export const ColumnsService: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 30 },
  { field: 'createdAt', headerName: 'Fecha de Creación', flex: 100,
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      if (params.value == null) {
        return '';
      }
      return formatDate(params.value, FORMATS_DATE.MM_DD_YYYY);
    },
  },
  { field: 'amount', headerName: 'Monto', flex: 70, },
  { field: 'description', headerName: 'descripción', flex: 70, },

];