import { t } from 'i18next';
import { Badge, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useGetServiceQuery } from '../redux/api/serviceApi';
import useService from '../redux/hooks/useService';
import { ColumnsService } from '../helpers/columnsService';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgButton } from '../../../../components/form/button/SgButton';
import { SgTable } from '../../../../components/table/SgTable';
import { ColumnsUser } from '../../user/helpers';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { NotesButton } from '../../components/notes/components/NotesButton';

export const ListService = () => {
  const { openModalServiceAction, selectServiceAction } = useService();
  const { data, isLoading, refetch } = useGetServiceQuery('');
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const onClickEdit = (params: GridRenderCellParams) => {
    openModalServiceAction({ refresh: refetch });
    selectServiceAction(params.row);
  };

  const columnsService = ColumnsService();

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
                keyProp="serviceId"
                id={params.row.id}
                count={params.row.id}
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
      <div style={{ height: '70vh', width: '100%' }}>
        <SgTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
