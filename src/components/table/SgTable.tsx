import { useState } from 'react';
import { DataGrid, GridRowParams, GridToolbar } from '@mui/x-data-grid';
import { SgTableProps } from './dto/SgTableProps';
import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const SgTable = (props: SgTableProps) => {
  const { data, columns, isLoading, onRowDoubleClick } = props;
  const { t } = useTranslation();
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
    <>
      {isLoading ? (
        <Skeleton variant="rectangular" height={218} />
      ) : (
        <DataGrid
          rows={data || []}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          loading={isLoading}
          disableRowSelectionOnClick
          onRowDoubleClick={handleRowDoubleClick}
          filterMode="client"
          // onSelectionModelChange={changeCheckBoxesSelection}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          localeText={{
            toolbarColumns: `${t('columns')}`,
            toolbarFilters: `${t('filter')}`,
            toolbarDensity: `${t('size')}`,
            toolbarFiltersTooltipHide: `${t('hide')}`,
            toolbarFiltersTooltipShow: `${t('show')}`,
            columnsPanelTextFieldLabel: `${t('columns')}`,
            columnsPanelTextFieldPlaceholder: `${t('search_column')}`,
            columnsPanelShowAllButton: `${t('show')}`,
            columnsPanelHideAllButton: `${t('hide')}`,
            toolbarExportCSV: `${t('export_to_csv')}`,
            toolbarExportPrint: `${t('print')}`,
            toolbarExport: `${t('export')}`,
            toolbarDensityLabel: `${t('size')}`,
            toolbarDensityCompact: `${t('compact')}`,
            toolbarDensityStandard: `${t('standard')}`,
            toolbarDensityComfortable: `${t('comfortable')}`,
            filterPanelInputLabel: `${t('value')}`,
            filterPanelInputPlaceholder: `${t('filter_by')}`,
            filterOperatorContains: `${t('contains')}`,
            filterOperatorEquals: `${t('equals')}`,
            filterOperatorStartsWith: `${t('starts_with')}`,
            filterOperatorEndsWith: `${t('ends_with')}`,
            filterOperatorIsEmpty: `${t('is_empty')}`,
            filterOperatorIsNotEmpty: `${t('is_not_empty')}`,
            noRowsLabel: `${t('no_data_found')}`,
          }}
        />
      )}
    </>
  );
};
