import { ReactNode } from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';
import { GridValueFormatterParams } from '@mui/x-data-grid';

export interface ColumnsProps {
  field: string;
  headerName: string;
  flex: number;
  renderCell?: (params: GridRenderCellParams) => ReactNode;
  valueFormatter?: (params: GridValueFormatterParams<string>) => string;
  filterParams?: any;
  filterOperators?: any;
}
