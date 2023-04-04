import { GridColDef } from '@mui/x-data-grid';




export const ColumnsInventory: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 30 },
    { field: 'name', headerName: 'Nombre', flex: 100},
    { field: 'description', headerName: 'Descripción', flex: 70, },
    { field: 'quantity', headerName: 'Cantidad', flex: 70, },
    { field: 'status_id', headerName: 'Estado', flex: 70, renderCell: (params) => {
            return (<span> { params.row.status.name } </span>)}
    },
    { field: 'create_at', headerName: 'Fecha de creación', flex: 70, renderCell: (params) => {
            return (<span> { params.row.createdAt } </span>)}
    },
    { field: 'create_by', headerName: 'Creador', flex: 70,
        renderCell: (params) => {
            return (<span> { params.row.firstName } { params.row.lastName }</span>)}
    },

];