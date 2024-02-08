import { GridColDef, GridRowParams } from '@mui/x-data-grid';

interface SgTableProps {
  columns: GridColDef[];
  data: any[];
  isLoading: boolean;
  onRowDoubleClick?: (params: GridRowParams) => void;
  onCellClick?: (params: GridRowParams) => void;
  checkboxSelection?: boolean;
}

interface paginationProps {
  pageSize: number;
  page: number;
}
