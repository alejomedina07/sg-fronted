import { ColumnsAccountsPayable } from '../../helpers';
import { SgTable } from '../../../../../components/sgTable/SgTable';
import { ColumnsProps } from '../../../../../components/dto/ColumnsProps';
import {
  GridRenderCellParams,
  GridRowModel,
  GridValidRowModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import DateFnsManager from '../../../../../services/utils/DateFnsManager';
import { useTranslation } from 'react-i18next';
import { Dispatch, useState } from 'react';
import useSnackbar from '../../../../../store/hooks/notifications/snackbar/useSnackbar';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { NotesButton } from '../../../components/notes/components/NotesButton';
import useDialogs from '../../../../../store/hooks/dialogs/useDialogs';

interface ListAccountPayableQuickProps {
  data: any;
  setData: Dispatch<any>;
  setEditMode: Dispatch<any>;
}

const dateManage = new DateFnsManager();

export const ListAccountPayableQuick = (
  props: ListAccountPayableQuickProps
) => {
  const { data, setData, setEditMode } = props;
  const { t } = useTranslation();
  const { openSnackbarAction } = useSnackbar();
  const { openConfirmationDialog } = useDialogs();

  const onClickDelete = (params: GridRenderCellParams) => {
    openConfirmationDialog({
      message: t('message_confirm_delete'),
      callback: () => onConfirmDelete(params.row.id),
      onClose: false,
      title: t('title_confirm_delete'),
    });
  };

  const onConfirmDelete = (idToDelete: any) => {
    const newArray = data.filter((item: any) => item.id !== idToDelete);
    setData([...newArray]);
  };

  const columns: ColumnsProps[] = [
    { field: 'id', headerName: `${t('ID')}`, flex: 30 },
    { field: 'reference', headerName: `${t('reference')}`, flex: 60 },
    { field: 'amount', headerName: `${t('amount')}`, flex: 70 },
    { field: 'amountPaid', headerName: `${t('amount_paid')}`, flex: 70 },
    {
      field: 'createdAt',
      headerName: `${t('created_at')}`,
      flex: 70,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value == null) {
          return '';
        }
        return dateManage.getFormatStandard(new Date(params.value));
      },
    },
    {
      field: 'maxDateOfPay',
      headerName: `${t('max_date_of_day')}`,
      flex: 100,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value == null) {
          return '';
        }
        return dateManage.getFormatStandard(new Date(params.value));
      },
    },
    {
      field: 'maxPaid',
      headerName: `${t('maxPaid')}`,
      flex: 50,
    },
    {
      field: 'pay',
      headerName: `${t('pay')}`,
      flex: 50,
      type: 'number',
      editable: true,
    },
    {
      field: 'actions',
      headerName: `${t('actions')}`,
      flex: 40,
      renderCell: (params) => {
        return (
          <div className="flex flex-row items-center">
            <IconButton onClick={() => onClickDelete(params)} aria-label="view">
              <DeleteIcon color="error" />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const processRowUpdate = (
    newRow: GridRowModel,
    oldRow: GridValidRowModel
  ) => {
    if (newRow.maxPaid >= newRow.pay) {
      const updatedRow = { ...newRow, isNew: false };
      setData(
        data.map((row: any) => (row.id === newRow.id ? updatedRow : row))
      );
    } else {
      setData([...data]);
      openSnackbarAction({
        message: `${t('amount_incorrect')}`,
        type: 'error',
      });
    }
  };

  const onCellEditStart = (params: any) => {
    setEditMode(true);
  };

  const onCellEditStop = (params: any) => {
    setEditMode(false);
  };

  return (
    <>
      <SgTable
        columns={columns}
        data={data || []}
        isLoading={false}
        autoHeight={true}
        processRowUpdateAction={processRowUpdate}
        onCellEditStartAction={onCellEditStart}
        onCellEditStopAction={onCellEditStop}
        disableColumnFilter
      />
    </>
  );
};
