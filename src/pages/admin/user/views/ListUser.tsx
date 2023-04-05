import { useGetUsersQuery } from '../redux/api/userApi';
import { SgTable }          from '../../../../components/table/SgTable';
import { ViewTitle }        from '../../components/share/title/ViewTitle';
import { SgLink }           from '../../../../components/form/button/SgLink';
import { ColumnsUser }      from '../helpers/columnsUser';
import { GridRowParams }    from '@mui/x-data-grid';
import useForms             from '../../../../store/hooks/form/useForms';
import { useNavigate }      from 'react-router-dom';
import {t} from 'i18next';

export const ListUser = () => {
  const { data, isLoading } = useGetUsersQuery('');
  const navigate = useNavigate();

  const { setUserEditAction } = useForms();
  const handleRowDoubleClick = (params: GridRowParams) => {
    console.log('handleRowDoubleClick', params);
    setUserEditAction(params.row);
    navigate(`/admin/users/edit/${params.row.id}`);
  }

  return (
    <>
      <ViewTitle title={t('list_user')}>
        <SgLink label={t('create_user')} to="/admin/users/create"/>
      </ViewTitle>
      <div style={{ height: '70vh', width: '100%' }}>
        <SgTable
          columns={ColumnsUser}
          data={data?.data || []}
          isLoading={isLoading}
          onRowDoubleClick={handleRowDoubleClick}
        />
      </div>
    </>
  );
};
