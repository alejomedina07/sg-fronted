import { ColumnsProps } from '../../../../../components/dto/ColumnsProps';
import { t } from 'i18next';
import { SgTable } from '../../../../../components/sgTable/SgTable';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetRolesQuery } from '../redux/api/rolApi';
import UseRol from '../redux/hooks/useRol';
import { useState } from 'react';

interface ListRolComponentProps {
  callRolApi: boolean;
}

export const ListRolComponent = (props: ListRolComponentProps) => {
  const { callRolApi } = props;
  const { selectRolAction } = UseRol();

  const columns: ColumnsProps[] = [
    { field: 'id', headerName: `${t('ID')}`, flex: 50 },
    { field: 'name', headerName: `${t('name')}`, flex: 100 },
    { field: 'description', headerName: `${t('description')}`, flex: 70 },
    {
      field: 'actions',
      headerName: `${t('actions')}`,
      flex: 50,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="flex flex-row items-center">
            <Tooltip title={t('view')} placement="bottom" arrow>
              <IconButton onClick={() => onClickView(params)} aria-label="view">
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  // const { data, isLoading } = useGetRolesQuery('');

  const [forceUpdate, setForceUpdate] = useState(0);

  const onRefresh = () => {
    setForceUpdate((prev) => prev + 1);
  };

  const onClickView = (params: GridRenderCellParams) => {
    selectRolAction({ rol: params.row, refresh: onRefresh });
  };

  // Usa el valor de forceUpdate como una dependencia en useGetRolesQuery
  // const { data, isLoading } = useGetRolesQuery('', {
  //   // skip: isLoading, // Evitar solicitudes adicionales mientras se está actualizando
  //   refetchOnMountOrArgChange: forceUpdate,
  // });
  // Usa el valor de forceUpdate como una dependencia en useGetRolesQuery
  const { data, isLoading } = useGetRolesQuery(callRolApi);

  return (
    <div className="p-4" style={{ width: '100%' }}>
      <SgTable
        autoHeight
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
      />
    </div>
  );
};
