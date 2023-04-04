import { GridColDef } from '@mui/x-data-grid';




export const ColumnsExpense: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 30 },
    { field: 'name', headerName: 'Nombre', flex: 100},
    { field: 'description', headerName: 'Descripción del gasto', flex: 70, },
    { field: 'amount', headerName: 'Monto', flex: 70, },
    { field: 'create_at', headerName: 'Fecha de creación', flex: 70,
        renderCell: (params) => {
            return (<span> { params.row.createdAt } </span>)}
    },
    { field: 'create_by', headerName: 'Creador', flex: 70,
        renderCell: (params) => {
            return (<span> { params.row.createdBy.firstName } { params.row.createdBy.lastName }</span>)}
    },

];
