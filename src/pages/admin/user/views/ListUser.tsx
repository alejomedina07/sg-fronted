import { useGetUsersQuery }                     from '../redux/api/userApi';
import { SgTable }                              from '../../../../components/table/SgTable';
import { ViewTitle }                            from '../../components/share/title/ViewTitle';
import { SgLink }                               from '../../../../components/form/button/SgLink';
import { ColumnsUser }                          from '../helpers/columnsUser';

export const ListUser = () => {
  const { data, isLoading } = useGetUsersQuery('');
  console.log(data);

  return (
    <>
      <ViewTitle title="list_users">
        <SgLink label="create_user" to="/admin/users/create"/>
      </ViewTitle>
      <div style={{ height: '70vh', width: '100%' }}>
        <SgTable
          columns={ColumnsUser}
          data={data?.data || []}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
