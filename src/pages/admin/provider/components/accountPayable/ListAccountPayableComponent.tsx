import React, { useCallback, useEffect, useState } from 'react';
import { paginationProps } from '../../../../../components/sgTable/dto/SgTableProps';
import { useGetAccountsPayableQuery } from '../../redux/api/providerApi';
import { SgTablePaginationServer } from '../../../../../components/sgTable/SgTablePaginationServer';
import {
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import { ColumnsAccountsPayable } from '../../helpers';
import { useTranslation } from 'react-i18next';
import DateFnsManager from '../../../../../services/utils/DateFnsManager';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const dateManage = new DateFnsManager();

interface ListAccountPayableComponentProps {
  modal: boolean;
  payment: boolean;
  setRowSelected: (newRowSelectionModel: GridRowSelectionModel) => void;
}
export const ListAccountPayableComponent = (
  props: ListAccountPayableComponentProps
) => {
  const { modal, setRowSelected, payment } = props;
  const [pagination, setPagination] = useState<paginationProps>({
    pageSize: 25,
    page: 0,
    filters: '',
    order: '',
  });
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetAccountsPayableQuery(pagination);
  const columnsAccountsPayable = ColumnsAccountsPayable();
  const handlePaginationChange = useCallback((params: paginationProps) => {
    if (
      params.page !== pagination.page ||
      params.pageSize !== pagination.pageSize ||
      params.order !== pagination.order ||
      params.filters !== pagination.filters
    ) {
      console.log(45, true);
      setPagination({
        pageSize: params.pageSize,
        page: params.page,
        order: params.order,
        filters: params.filters,
      });
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [modal, payment, refetch]);

  useEffect(() => {
    setColumns([
      ...columnsAccountsPayable,
      {
        field: 'actions',
        headerName: `${t('actions')}`,
        flex: 40,
        renderCell: (params) => {
          return (
            <div className="flex flex-row items-center">
              <IconButton
                onClick={() =>
                  navigate(`/admin/providers/account-payable/${params.row.id}`)
                }
                aria-label="view"
              >
                <VisibilityIcon />
              </IconButton>
            </div>
          );
        },
      },
    ]);
  }, [i18n.language]);

  const handleRowSelectionAction = (
    newRowSelectionModel: GridRowSelectionModel
  ) => {
    let accountsPayables: any = [];
    newRowSelectionModel.forEach((id: any) => {
      const item = data?.data.find((obj: any) => obj.id === id);
      if (item) accountsPayables.push(item);
    });
    setRowSelected([...accountsPayables]);
  };

  const isRowSelectable = (params: GridRowParams) => {
    return !params.row.paid;
  };

  const getRowClassName = (params: GridRowParams) => {
    const diff = dateManage.getDateDifference(
      new Date(),
      new Date(params.row.maxDateOfPay)
    );
    return params.row.paid
      ? 'bg-green-100'
      : diff < 0
      ? 'bg-red-100'
      : 'bg-amber-100';
  };

  return (
    <>
      <div style={{ width: '100%', minWidth: '900px' }}>
        <SgTablePaginationServer
          paginationChange={handlePaginationChange}
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
          total={data?.total || 0}
          rowSelectionAction={handleRowSelectionAction}
          isRowSelectableAction={isRowSelectable}
          getRowClassNameAction={getRowClassName}
        />
      </div>
    </>
  );
};
