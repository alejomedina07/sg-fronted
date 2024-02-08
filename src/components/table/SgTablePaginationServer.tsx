import { useEffect, useState } from 'react';
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import { SgTableProps } from './dto/SgTableProps';
import { Skeleton } from '@mui/material';

interface SgTablePaginationServerProps extends SgTableProps {
  paginationChange: (params: any) => any;
  total: number;
}

export const SgTablePaginationServer = (
  props: SgTablePaginationServerProps
) => {
  const { data, columns, isLoading, paginationChange, total } = props;
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  useEffect(() => {
    let active = true;

    (async () => {
      paginationChange(paginationModel);
      // const newRows = await paginationChange(paginationModel.page);
      // if (!active) {
      //   return;
      // }
      //
      // setRows(newRows);
      // setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [paginationModel.page, data]);

  return (
    <>
      {isLoading ? (
        <Skeleton variant="rectangular" height={218} />
      ) : (
        <DataGrid
          rows={data}
          columns={columns}
          pagination
          checkboxSelection
          paginationModel={paginationModel}
          pageSizeOptions={[25, 50, 100]}
          rowCount={total}
          paginationMode="server"
          // onPaginationModelChange={handlePageChange}
          onPaginationModelChange={setPaginationModel}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          loading={isLoading}
          keepNonExistentRowsSelected
        />
        // <DataGrid
        //   rows={data || []}
        //   columns={columns}
        //   paginationModel={paginationModel}
        //   onPaginationModelChange={setPaginationModel}
        //   loading={isLoading}
        //   disableRowSelectionOnClick
        //   onRowDoubleClick={handleRowDoubleClick}
        //   pagination
        //   pageSize={paginationModel.pageSize}
        //   page={paginationModel.page + 1} // DataGrid page starts from 1
        //   onPageChange={handlePageChange}
        //   // onSelectionModelChange={changeCheckBoxesSelection}
        //   slots={{
        //     toolbar: GridToolbar,
        //   }}
        //   localeText={{
        //     toolbarColumns: `${t('columns')}`,
        //     toolbarFilters: `${t('filter')}`,
        //     toolbarDensity: `${t('size')}`,
        //     toolbarFiltersTooltipHide: `${t('hide')}`,
        //     toolbarFiltersTooltipShow: `${t('show')}`,
        //     columnsPanelTextFieldLabel: `${t('columns')}`,
        //     columnsPanelTextFieldPlaceholder: `${t('search_column')}`,
        //     columnsPanelShowAllButton: `${t('show')}`,
        //     columnsPanelHideAllButton: `${t('hide')}`,
        //     toolbarExportCSV: `${t('export_to_csv')}`,
        //     toolbarExportPrint: `${t('print')}`,
        //     toolbarExport: `${t('export')}`,
        //     toolbarDensityLabel: `${t('size')}`,
        //     toolbarDensityCompact: `${t('compact')}`,
        //     toolbarDensityStandard: `${t('standard')}`,
        //     toolbarDensityComfortable: `${t('comfortable')}`,
        //     filterPanelInputLabel: `${t('value')}`,
        //     filterPanelInputPlaceholder: `${t('filter_by')}`,
        //     filterOperatorContains: `${t('contains')}`,
        //     filterOperatorEquals: `${t('equals')}`,
        //     filterOperatorStartsWith: `${t('starts_with')}`,
        //     filterOperatorEndsWith: `${t('ends_with')}`,
        //     filterOperatorIsEmpty: `${t('is_empty')}`,
        //     filterOperatorIsNotEmpty: `${t('is_not_empty')}`,
        //     noRowsLabel: `${t('no_data_found')}`,
        //   }}
        // />
      )}
    </>
  );
};
