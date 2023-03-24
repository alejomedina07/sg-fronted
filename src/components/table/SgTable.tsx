import { SgTableProps }                                                from './dto/SgTableProps';
import { useEffect, useState }                                         from 'react';
import { DataGrid, GridColDef, GridToolbar, GridValueFormatterParams } from '@mui/x-data-grid';
import { Avatar }                                                      from '@mui/material';


export const SgTable = (props: SgTableProps) => {
  const { data, columns, isLoading } = props;
  console.log(78, data);
  // const [pageSize, setPageSize] = useState(5);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const [newColumns, setNewColumns] = useState<GridColDef[]>([]);

  useEffect(() => {
    if (data.length && columns.length) {
      setNewColumns(columns)
    }
  }, [data]);

  return (
    <DataGrid
      rows={data || []}
      columns={columns}
      // getRowId={(row) => row.id || Math.random()}
      checkboxSelection
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      loading={isLoading}
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
        filterOperatorIsNotEmpty: 'No esta vacío'
      }}
    />
  );
};
