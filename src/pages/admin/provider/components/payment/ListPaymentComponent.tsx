import { ColumnsPayment } from '../../helpers/columnsPayment';
import React, { useCallback, useEffect, useState } from 'react';
import { paginationProps } from '../../../../../components/sgTable/dto/SgTableProps';
import { useTranslation } from 'react-i18next';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useGetPaymentsQuery } from '../../redux/api/providerApi';
import { NotesButton } from '../../../components/notes/components/NotesButton';
import { CONFIG_CONST } from '../../../config/configOption/const/configConst';
import { SgTablePaginationServer } from '../../../../../components/sgTable/SgTablePaginationServer';
import { SgTable } from '../../../../../components/sgTable/SgTable';

interface ListPaymentComponentProps {
  paymentsData?: any[];
}

export const ListPaymentComponent = (props: ListPaymentComponentProps) => {
  const { paymentsData } = props;
  const [pagination, setPagination] = useState<paginationProps>({
    pageSize: 25,
    page: 0,
    filters: '',
    order: '',
  });
  const columnsPayment = ColumnsPayment();
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const { data, isLoading } = useGetPaymentsQuery(pagination, {
    skip: !!paymentsData,
  });

  const handlePaginationChange = useCallback((params: paginationProps) => {
    if (
      params.page !== pagination.page ||
      params.pageSize !== pagination.pageSize ||
      params.order !== pagination.order ||
      params.filters !== pagination.filters
    ) {
      setPagination({
        pageSize: params.pageSize,
        page: params.page,
        order: params.order,
        filters: params.filters,
      });
    }
  }, []);

  useEffect(() => {
    setColumns([
      ...columnsPayment,
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

  return (
    <>
      {paymentsData ? (
        <div style={{ width: '100%', minWidth: '900px' }}>
          <SgTable
            autoHeight
            columns={columns}
            data={paymentsData || []}
            isLoading={false}
          />
        </div>
      ) : (
        <div style={{ width: '100%', minWidth: '900px' }}>
          <SgTablePaginationServer
            paginationChange={handlePaginationChange}
            columns={columns}
            data={data?.data || []}
            isLoading={isLoading}
            total={data?.total || 0}
          />
        </div>
      )}
    </>
  );
};
