import { ViewTitle }            from '../../components/share/title/ViewTitle';
import { SgLink }               from '../../../../components/form/button/SgLink';
import { SgTable }              from '../../../../components/table/SgTable';
import { ColumnsCustomer }      from '../helpers';
import { useGetCustomersQuery } from '../redux/api/customerApi';
import { t }                    from 'i18next';
import { useNavigate }          from 'react-router-dom';
import useForms                 from '../../../../store/hooks/form/useForms';
import { GridRowParams }        from '@mui/x-data-grid';

export const ListCustomer = () => {
  const { data, isLoading } = useGetCustomersQuery('');

  const navigate = useNavigate();

  const { setCustomerEditAction } = useForms();
  const handleRowDoubleClick = (params: GridRowParams) => {
    console.log('handleRowDoubleClick', params);
    setCustomerEditAction(params.row);
    navigate(`/admin/customer/edit/${params.row.id}`);
  }

  return (
    <>
      <ViewTitle title={t('list_customer')}>
        <SgLink label={t('create_customer')} to="/admin/customer/create"/>
      </ViewTitle>
      <div style={{ height: '70vh', width: '100%' }}>
        <SgTable
          columns={ColumnsCustomer}
          data={ data?.data || []}
          onRowDoubleClick={handleRowDoubleClick}
          isLoading={isLoading}/>
      </div>
    </>
  );
};
