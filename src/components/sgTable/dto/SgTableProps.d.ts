import {
  GridColDef,
  GridRowModel,
  GridRowParams,
  GridValidRowModel,
} from '@mui/x-data-grid';

interface SgTableProps {
  columns: GridColDef[];
  data: any[];
  isLoading: boolean;
  onRowDoubleClick?: (params: GridRowParams) => void;
  onCellClick?: (params: GridRowParams) => void;
  processRowUpdateAction?: (
    newRow: GridRowModel,
    oldRow: GridValidRowModel
  ) => void;
  onCellEditStartAction?: (params: any) => void;
  onCellEditStopAction?: (params: any) => void;
  checkboxSelection?: boolean;
  autoHeight?: boolean;
  disableColumnFilter?: boolean;
}

interface paginationProps {
  pageSize: number;
  page: number;
  order?: string;
  filters?: string;
}
