import { ColumnsProps } from '../../../../../components/dto/ColumnsProps';
import { t } from 'i18next';
import { SgTable } from '../../../../../components/table/SgTable';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetPermissionQuery } from '../redux/api/rolApi';
import { useState } from 'react';

export const ListPermissionComponent = () => {
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

  const [forceUpdate] = useState(0);

  const onClickView = (params: GridRenderCellParams) => {
    console.log(params);
    // selectRolAction({ rol: params.row, refresh: onRefresh });
  };

  // Usa el valor de forceUpdate como una dependencia en useGetRolesQuery
  const { data, isLoading } = useGetPermissionQuery('', {
    // skip: isLoading, // Evitar solicitudes adicionales mientras se está actualizando
    refetchOnMountOrArgChange: forceUpdate,
  });

  return (
    <div className="p-4" style={{ height: '45vh', width: '100%' }}>
      <SgTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
      />
    </div>
  );
};
