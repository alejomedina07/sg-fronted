import React, { useCallback, useEffect, useState } from 'react';
import { paginationProps } from '../../../../../components/sgTable/dto/SgTableProps';
import { useTranslation } from 'react-i18next';
import { GridColDef } from '@mui/x-data-grid';
import { useGetAttentionsQuery } from '../../redux/api/turnApi';
import { ViewTitle } from '../../../components/share/title/ViewTitle';
import { ColumnsAttention } from '../../helpers/columnsAttention';
import { SgTablePaginationServer } from '../../../../../components/sgTable/SgTablePaginationServer';
import { SgFilter } from '../../../../../components/shared/filter/SgFilter';
import { useLocation } from 'react-router-dom';

const initPagination: paginationProps = {
  pageSize: 25,
  page: 0,
  filters: '',
  order: '',
};

export const ListAttentionView = () => {
  const [pagination, setPagination] = useState<paginationProps>(initPagination);
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [filters, setFilters] = useState('');
  const { data, isLoading } = useGetAttentionsQuery(pagination);
  const location = useLocation();

  useEffect(() => {
    // Obtener los parámetros de consulta de la ubicación actual
    const searchParams = new URLSearchParams(location.search);
    const typeTurnId = searchParams.get('typeTurnId');
    console.log(789, typeTurnId);
    if (typeTurnId && parseInt(typeTurnId) > 0) {
      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      setFilters(
        `&filters[typeTurnId]=${parseInt(
          typeTurnId
        )}&filters[createdAt]=${today.toISOString()}&filters[type]=AND`
      );
      // setFilters(`&filters[typeTurnId]=${parseInt(typeTurnId)}`);
    }
  }, [location.search]);

  const handleView = (turn: any) => {
    console.log(turn);
  };

  console.log('filters:::', filters);

  const columnsAttention = ColumnsAttention();

  useEffect(() => {
    setColumns([...columnsAttention]);
  }, [i18n.language]);

  // console.log(data);

  const handleSetPagination = (param: paginationProps) => {
    // return filters;
    console.log(1234, filters);
    setPagination({ ...param, filters });
  };

  // const handlePaginationChange = useCallback((params: paginationProps) => {
  //   console.log(1, filters);
  //   if (
  //     params.page !== pagination.page ||
  //     params.pageSize !== pagination.pageSize ||
  //     params.order !== pagination.order ||
  //     params.filters !== pagination.filters
  //   ) {
  //     // setPagination({
  //     //   pageSize: params.pageSize,
  //     //   page: params.page,
  //     //   order: params.order,
  //     //   filters,
  //     // });
  //     handleSetPagination({
  //       pageSize: params.pageSize,
  //       page: params.page,
  //       order: params.order,
  //     });
  //   }
  // }, []);

  const handlePaginationChange = (params: paginationProps) => {
    console.log(1, filters);
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
        filters,
      });
    }
  };

  useEffect(() => {
    console.log(1);
    setPagination({ ...initPagination, filters });
  }, [filters]);

  return (
    <>
      <ViewTitle title={t('list_attentions')}>
        <SgFilter data={[]} filters={filters} setFilters={setFilters} />
      </ViewTitle>
      {/* <ViewTitle title={t('list_attentions')} /> */}
      <div style={{ width: '100%', minWidth: '900px' }}>
        <SgTablePaginationServer
          paginationChange={handlePaginationChange}
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
          total={data?.total || 0}
          disableColumnFilter
        />
      </div>
    </>
  );
};
