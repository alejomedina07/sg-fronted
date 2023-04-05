import { GridColDef } from '@mui/x-data-grid';
import {t} from 'i18next';

export const ColumnsInventory: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 30 },
    { field: 'name', headerName: `${t('name')}`, flex: 100},
    { field: 'description', headerName: `${t('description')}`, flex: 70, },
    { field: 'quantity', headerName: `${t('quantity')}`, flex: 70, },
    { field: 'statusId', headerName: `${t('status')}`, flex: 70, renderCell: (params) => {
            return (<span> { params.row.status.name } </span>)}
    },
    { field: 'create_at', headerName: `${t('created_at')}`, flex: 70, renderCell: (params) => {
            return (<span> { params.row.createdAt } </span>)}
    },
    { field: 'create_by', headerName: `${t('created_by')}`, flex: 70,
        renderCell: (params) => {
            return (<span> { params.row.firstName } { params.row.lastName }</span>)}
    },

];