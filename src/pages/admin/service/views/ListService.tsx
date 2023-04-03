import { ViewTitle }          from '../../components/share/title/ViewTitle';
import { SgLink }             from '../../../../components/form/button/SgLink';
import { SgTable }            from '../../../../components/table/SgTable';
import { ColumnsService }     from '../helpers/columnsService';
import { useGetServiceQuery } from '../redux/api/serviceApi';


export const ListService = () => {
  const { data, isLoading } = useGetServiceQuery('');
  console.log(data);
  return (
    <>
      <ViewTitle title="list_service">
        <SgLink label="create_service" to="/admin/service/create"/>
      </ViewTitle>
      <div style={{ height: '70vh', width: '100%' }}>
        <SgTable
          columns={ColumnsService}
          data={ data?.data || []}
          isLoading={isLoading}/>
      </div>
    </>
  );
};