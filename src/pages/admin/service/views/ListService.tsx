import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useGetServiceQuery } from '../redux/api/serviceApi';
import useService from '../redux/hooks/useService';
import { ColumnsService } from '../helpers/columnsService';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgButton } from '../../../../components/form/button/SgButton';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { NotesButton } from '../../components/notes/components/NotesButton';
import { CONFIG_CONST } from '../../config/configOption/const/configConst';
import { SgTablePaginationServer } from '../../../../components/sgTable/SgTablePaginationServer';
import { paginationProps } from '../../../../components/sgTable/dto/SgTableProps';

export const ListService = () => {
  const { openModalServiceAction, selectServiceAction } = useService();
  const [pagination, setPagination] = useState<paginationProps>({
    pageSize: 50,
    page: 1,
  });
  const { data, isLoading, refetch } = useGetServiceQuery(pagination);
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const onClickEdit = (params: GridRenderCellParams) => {
    openModalServiceAction({ refresh: refetch });
    selectServiceAction(params.row);
  };

  const columnsService = ColumnsService();

  const handlePaginationChange = (params: paginationProps) => {
    try {
      setPagination({ pageSize: params.pageSize, page: params.page + 1 });
    } catch (e) {}
  };

  useEffect(() => {
    setColumns([
      ...columnsService,
      {
        field: 'actions',
        headerName: `${t('actions')}`,
        flex: 40,
        renderCell: (params) => {
          return (
            <div className="flex flex-row items-center">
              <IconButton onClick={() => onClickEdit(params)} aria-label="view">
                <VisibilityIcon />
              </IconButton>
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
      <ViewTitle title={t('list_service')}>
        <SgButton
          label={t('create_service')}
          variant="outlined"
          onClickAction={() => openModalServiceAction({ refresh: refetch })}
        />
      </ViewTitle>
      <div style={{ height: '70vh', width: '100%', minWidth: '900px' }}>
        {/* <SgTable */}
        {/*   columns={columns} */}
        {/*   data={data?.data || []} */}
        {/*   isLoading={isLoading} */}
        {/* /> */}
        <SgTablePaginationServer
          // paginationChange={refetch}
          paginationChange={handlePaginationChange}
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
          total={data?.total || 0}
        />
      </div>
    </>
  );
};
