import { ReactNode } from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';

export interface ColumnsProps {
  field: string;
  headerName: string;
  flex: number;
  renderCell?: (params: GridRenderCellParams) => ReactNode;
  valueFormatter?: (params: GridValueFormatterParams<string>) => string;
}