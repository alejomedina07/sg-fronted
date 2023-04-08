import { ViewTitle }          from '../../components/share/title/ViewTitle';
import { SgLink }             from '../../../../components/form/button/SgLink';
import { SgTable }            from '../../../../components/table/SgTable';
import { ColumnsService }     from '../helpers/columnsService';
import { useGetServiceQuery } from '../redux/api/serviceApi';
import {t}                    from 'i18next';
import { useNavigate }        from 'react-router-dom';
import useForms               from '../../../../store/hooks/form/useForms';
import { GridRowParams }      from '@mui/x-data-grid';


export const ListService = () => {
  const { data, isLoading } = useGetServiceQuery('');
  const navigate = useNavigate();
  const { setServiceEditAction } = useForms();
  const handleRowDoubleClick = (params: GridRowParams) => {
    console.log('handleRowDoubleClick', params);
    setServiceEditAction(params.row);
    navigate(`/admin/service/edit/${params.row.id}`);
  }

  return (
    <>
      <ViewTitle title={t('list_service')}>
        <SgLink label={t('create_service')} to="/admin/service/create"/>
      </ViewTitle>
      <div style={{ height: '70vh', width: '100%' }}>
        <SgTable
          columns={ColumnsService}
          onRowDoubleClick={ handleRowDoubleClick }
          data={ data?.data || []}
          isLoading={isLoading}/>
      </div>
    </>
  );
};