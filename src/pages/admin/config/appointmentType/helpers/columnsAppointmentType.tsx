import { GridColDef } from '@mui/x-data-grid';
import { t }                      from 'i18next';

export const ColumnsAppointmentType: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 30 },
  { field: 'name', headerName: `${t('name')}` , flex: 100},
  { field: 'description', headerName: `${t('description')}` , flex: 100, },
  { field: 'status', headerName: `${t('status')}` , flex: 30, renderCell: (params) => {
      return (  <span> { params.row.status == true ? 'Activo'  : 'Inactivo' } </span>)}
  },
  { field: 'create_at', headerName: `${t('created_at')}` , flex: 70, renderCell: (params) => {
      return (<span> { params.row.createdAt } </span>)}
  },
];