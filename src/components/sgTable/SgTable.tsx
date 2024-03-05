import { useEffect, useState } from 'react';
import {
  DataGrid,
  GridRowModel,
  GridRowParams,
  GridToolbar,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { SgTableProps } from './dto/SgTableProps';
import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SgTableGridLocaleText } from '../shared/const/SgTableGridLocaleText';
import { NotFound } from './NotFound';

export const SgTable = (props: SgTableProps) => {
  const {
    data,
    columns,
    isLoading,
    onRowDoubleClick,
    onCellClick,
    autoHeight,
    processRowUpdateAction,
    onCellEditStartAction,
    onCellEditStopAction,
    disableColumnFilter,
  } = props;
  const { t, i18n } = useTranslation();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const [localText, setLocalText] = useState(SgTableGridLocaleText);

  useEffect(() => {
    let newLocalText: any = {};
    for (const [key, value] of Object.entries(SgTableGridLocaleText)) {
      newLocalText[key] = t(value);
    }
    setLocalText(newLocalText);
  }, [i18n.language]);

  const handleRowDoubleClick = (params: GridRowParams) => {
    if (onRowDoubleClick) {
      onRowDoubleClick(params);
    }
  };

  const handleOnCellClick = (params: any) => {
    if (onCellClick) onCellClick(params);
  };

  const processRowUpdate = (
    newRow: GridRowModel,
    oldRow: GridValidRowModel
  ) => {
    if (processRowUpdateAction) processRowUpdateAction(newRow, oldRow);
    return { ...newRow, isNew: false };
  };

  const onCellEditStart = (params: any) => {
    if (onCellEditStartAction) onCellEditStartAction(params);
  };

  const onCellEditStop = (params: any) => {
    if (onCellEditStopAction) onCellEditStopAction(params);
  };

  return (
    <>
      {isLoading ? (
        <Skeleton variant="rectangular" height={218} />
      ) : (
        <DataGrid
          autoHeight={autoHeight}
          rows={data || []}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          loading={isLoading}
          disableRowSelectionOnClick
          onRowDoubleClick={handleRowDoubleClick}
          filterMode="client"
          onCellClick={handleOnCellClick}
          sx={{ cursor: onCellClick ? 'pointer' : '' }}
          slots={{ toolbar: GridToolbar, noRowsOverlay: NotFound }}
          processRowUpdate={processRowUpdate}
          onCellEditStart={onCellEditStart}
          onCellEditStop={onCellEditStop}
          disableColumnFilter={disableColumnFilter}
          slotProps={{ toolbar: { showQuickFilter: true } }}
          localeText={localText}
        />
      )}
    </>
  );
};
