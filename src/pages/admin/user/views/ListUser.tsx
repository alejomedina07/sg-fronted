import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetUsersQuery } from '../redux/api/userApi';
import { ColumnsUser } from '../helpers';
import { SgTable } from '../../../../components/table/SgTable';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgLink } from '../../../../components/form/button/SgLink';
import useForms from '../../../../store/hooks/form/useForms';
import { useTranslation } from 'react-i18next';

export const ListUser = () => {
  const { data, isLoading } = useGetUsersQuery('');
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const { setUserEditAction } = useForms();

  const onClickView = (params: GridRenderCellParams) => {
    setUserEditAction(params.row);
    navigate(`/admin/users/edit/${params.row.id}`);
  };

  const navigate = useNavigate();

  const columnsUser = ColumnsUser();

  useEffect(() => {
    setColumns([
      ...columnsUser,
      {
        field: 'actions',
        headerName: `${t('actions')}`,
        flex: 50,
        renderCell: (params: GridRenderCellParams) => {
          return (
            <div className="flex flex-row items-center">
              <Tooltip title={t('view')} placement="bottom" arrow>
                <IconButton
                  onClick={() => onClickView(params)}
                  aria-label="view"
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            </div>
          );
        },
      },
    ]);
  }, [i18n.language]);

  return (
    <>
      <ViewTitle title={t('list_user')}>
        <SgLink label={t('create_user')} to="/admin/users/create" />
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
