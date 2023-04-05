import { ViewTitle }            from '../../components/share/title/ViewTitle';
import { SgLink }               from '../../../../components/form/button/SgLink';
import { SgTable }              from '../../../../components/table/SgTable';
import { ColumnsCustomer }      from '../helpers';
import { useGetCustomersQuery } from '../redux/api/customerApi';
import { t }                      from 'i18next';

export const ListCustomer = () => {
  const { data, isLoading } = useGetCustomersQuery('');

  return (
    <>
      <ViewTitle title={t('list_customer')}>
        <SgLink label={t('create_customer')} to="/admin/customer/create"/>
      </ViewTitle>
      <div style={{ height: '70vh', width: '100%' }}>
        <SgTable
          columns={ColumnsCustomer}
          data={ data?.data || []}
          isLoading={isLoading}/>
      </div>
    </>
  );
};
