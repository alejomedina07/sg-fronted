import React, { useCallback, useEffect, useState } from 'react';
import { paginationProps } from '../../../../components/sgTable/dto/SgTableProps';
import { useGetAccountsPayableQuery } from '../redux/api/providerApi';
import { SgTablePaginationServer } from '../../../../components/sgTable/SgTablePaginationServer';
import {
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import { NotesButton } from '../../components/notes/components/NotesButton';
import { CONFIG_CONST } from '../../config/configOption/const/configConst';
import { ColumnsAccountsPayable } from '../helpers';
import { useTranslation } from 'react-i18next';

interface ListAccountPayableComponentProps {
  providerId?: number;
  modal: boolean;
  payment: boolean;
  setRowSelected: (newRowSelectionModel: GridRowSelectionModel) => void;
}
export const ListAccountPayableComponent = (
  props: ListAccountPayableComponentProps
) => {
  const { providerId, modal, setRowSelected, payment } = props;
  const [pagination, setPagination] = useState<paginationProps>({
    pageSize: 50,
    page: 1,
  });
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const { data, isLoading, refetch } = useGetAccountsPayableQuery(pagination);
  const columnsAccountsPayable = ColumnsAccountsPayable();
  const handlePaginationChange = useCallback((params: paginationProps) => {
    setPagination({
      pageSize: params.pageSize,
      page: params.page + 1,
      order: params.order,
      filters: params.filters,
    });
  }, []);

  useEffect(() => {
    refetch();
  }, [modal, payment]);

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
              {/* <IconButton onClick={() => onClickEdit(params)} aria-label="view"> */}
              {/*   <VisibilityIcon /> */}
              {/* </IconButton> */}
              <NotesButton
                entityType={CONFIG_CONST.NOTE.ENTITY_SERVICE}
                entityId={params.row.id}
              />
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
    return params.row.paid ? 'bg-green-200' : 'bg-red-100';
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
