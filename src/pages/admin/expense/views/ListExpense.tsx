import {ViewTitle} from '../../components/share/title/ViewTitle';
import {SgLink} from '../../../../components/form/button/SgLink';
import {SgTable} from '../../../../components/table/SgTable';
import {ColumnsExpense} from '../helpers/columnsExpense';
import {useGetExpenseQuery} from '../redux/api/expenseApi';
import { t } from 'i18next';

export const ListExpense = () => {
    const { data, isLoading } = useGetExpenseQuery('');
  console.log(23, data);
    return (
        <>
            <ViewTitle title= {t('list_expense')}>
                <SgLink label={t('create_expense')} to="/admin/expense/create"/>
            </ViewTitle>
            <div style={{ height: '70vh', width: '100%' }}>
                <SgTable
                    columns={ColumnsExpense}
                    data={ data?.data || []}
                    isLoading={isLoading}/>
            </div>
        </>
    )
}

