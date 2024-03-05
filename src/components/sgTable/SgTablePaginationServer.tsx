import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DataGrid,
  GridFilterModel,
  GridRowParams,
  GridRowSelectionModel,
  GridSortModel,
  GridToolbar,
} from '@mui/x-data-grid';
import { SgTableProps } from './dto/SgTableProps';
import { Skeleton } from '@mui/material';
import { GridSortItem } from '@mui/x-data-grid/models/gridSortModel';
import { GridFilterItem } from '@mui/x-data-grid/models/gridFilterItem';
import { SgTableGridLocaleText } from '../shared/const/SgTableGridLocaleText';
import { useTranslation } from 'react-i18next';
import { NotFound } from './NotFound';

interface SgTablePaginationServerProps extends SgTableProps {
  paginationChange: (params: any) => any;
  total: number;
  rowSelectionAction?: (params: GridRowSelectionModel) => void;
  isRowSelectableAction?: (params: GridRowParams) => boolean;
  getRowClassNameAction?: (params: GridRowParams) => string;
}

export const SgTablePaginationServer = (
  props: SgTablePaginationServerProps
) => {
  const {
    data,
    columns,
    isLoading,
    paginationChange,
    total,
    rowSelectionAction,
    isRowSelectableAction,
    getRowClassNameAction,
  } = props;
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const { t, i18n } = useTranslation();
  const [filters, setFilters] = useState<string>('');
  const [order, setOrder] = useState<string>('');
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const [localText, setLocalText] = useState(SgTableGridLocaleText);

  useEffect(() => {
    let newLocalText: any = {};
    for (const [key, value] of Object.entries(SgTableGridLocaleText)) {
      newLocalText[key] = t(value);
    }
    setLocalText(newLocalText);
  }, [i18n.language]);

  useEffect(() => {
    let active = true;
    (async () => {
      paginationChange({ ...paginationModel, order, filters });
    })();
    return () => {
      active = false;
    };
  }, [paginationModel.pageSize, paginationModel.page, data, order, filters]);

  const handleRowSelection = (newRowSelectionModel: GridRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
    if (rowSelectionAction) rowSelectionAction(newRowSelectionModel);
  };

  const onFilterChange = useCallback((filterModel: GridFilterModel) => {
    let filterCustom: string = '';
    filterModel.items.forEach((item: GridFilterItem) => {
      if (item.value !== undefined)
        filterCustom += `&filters[${item.field}]=${item.value}`;
    });
    setFilters(filterCustom);
  }, []);

  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    let orderCustom: string = '';
    sortModel.forEach(
      (item: GridSortItem) =>
        (orderCustom += `&order[${item.field}]=${item.sort}`)
    );
    setOrder(orderCustom);
  }, []);

  const isRowSelectable = (params: GridRowParams) => {
    if (isRowSelectableAction) return isRowSelectableAction(params);
    return true;
  };

  // const getRowClassName = (params: GridRowParams) => {
  //   if (getRowClassNameAction) return getRowClassNameAction(params);
  //   return '';
  // };

  const getRowClassName = useMemo(() => {
    return (params: GridRowParams) => {
      if (getRowClassNameAction) return getRowClassNameAction(params);
      return '';
    };
  }, [getRowClassNameAction]);

  return (
    <>
      {isLoading ? (
        <Skeleton variant="rectangular" height={218} />
      ) : (
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          pagination
          checkboxSelection={!!rowSelectionAction}
          paginationModel={paginationModel}
          pageSizeOptions={[25, 50, 100]}
          rowCount={total}
          paginationMode="server"
          filterMode="server"
          onFilterModelChange={onFilterChange}
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
          slots={{ toolbar: GridToolbar, noRowsOverlay: NotFound }}
          // onPaginationModelChange={handlePageChange}
          onPaginationModelChange={setPaginationModel}
          onRowSelectionModelChange={handleRowSelection}
          rowSelectionModel={rowSelectionModel}
          loading={isLoading}
          keepNonExistentRowsSelected
          isRowSelectable={isRowSelectable}
          getRowClassName={getRowClassName}
          localeText={localText}
        />
      )}
    </>
  );
};
