import { GridColDef } from '@mui/x-data-grid';




export const ColumnsInventory: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 30 },
    { field: 'name', headerName: 'Nombre', flex: 100},
    { field: 'description', headerName: 'Descripción', flex: 70, },
    { field: 'quantity', headerName: 'Cantidad', flex: 70, },
    { field: 'status', headerName: 'Estado', flex: 70, },
    { field: 'create_at', headerName: 'Fecha de creación', flex: 70, },
    { field: 'create_by', headerName: 'Creador', flex: 70, },

];