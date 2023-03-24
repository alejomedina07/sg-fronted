import { GridColDef }  from '@mui/x-data-grid';


interface SgTableProps {
  columns: GridColDef[]
  data: any[];
  isLoading: boolean;
}
