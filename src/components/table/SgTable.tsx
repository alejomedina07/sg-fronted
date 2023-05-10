import { useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { SgTableProps } from './dto/SgTableProps';
import { useTranslation } from 'react-i18next';

export const SgTable = (props: SgTableProps) => {
  const { data, columns, isLoading, onRowDoubleClick, checkboxSelection } =
    props;
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });
  const handleRowDoubleClick = (params: GridRowParams) => {
    if (onRowDoubleClick) {
      onRowDoubleClick(params);
    }
  };

  return (
    <DataGrid
      rows={data || []}
      columns={columns}
      checkboxSelection={checkboxSelection}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      loading={isLoading}
      onRowDoubleClick={handleRowDoubleClick}
      // onSelectionModelChange={changeCheckBoxesSelection}
      slots={{
        toolbar: GridToolbar,
      }}
      localeText={{
        toolbarColumns: 'Columnas',
        toolbarFilters: 'Filtros',
        toolbarDensity: 'Tamaño',
        toolbarFiltersTooltipHide: 'Esconder',
        toolbarFiltersTooltipShow: 'Mostrar',
        columnsPanelTextFieldLabel: 'Columnas',
        columnsPanelTextFieldPlaceholder: 'Buscar Columna',
        // columnsPanelDragIconLabel: 'hola',
        columnsPanelShowAllButton: 'Mostrar',
        columnsPanelHideAllButton: 'Ocultar',
        toolbarExportCSV: 'Exportar a CSV',
        toolbarExportPrint: 'Imprimir',
        toolbarExport: 'Exportar',
        toolbarDensityLabel: 'Size',
        toolbarDensityCompact: 'Compacto',
        toolbarDensityStandard: 'Medio',
        toolbarDensityComfortable: 'Largo',
        filterPanelInputLabel: 'Valor',
        filterPanelInputPlaceholder: 'Filtrar por',
        filterOperatorContains: 'Contiene',
        filterOperatorEquals: 'Igual',
        filterOperatorStartsWith: 'Empieza por:',
        filterOperatorEndsWith: 'Finaliza en:',
        filterOperatorIsEmpty: 'Esta vacío',
        filterOperatorIsNotEmpty: 'No esta vacío',
      }}
    />
  );
};
