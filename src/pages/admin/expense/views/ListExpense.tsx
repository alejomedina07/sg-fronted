import {ViewTitle}          from '../../components/share/title/ViewTitle';
import {SgLink}             from '../../../../components/form/button/SgLink';
import {SgTable}            from '../../../../components/table/SgTable';
import {ColumnsExpense}     from '../helpers/columnsExpense';
import {useGetExpenseQuery} from '../redux/api/expenseApi';
import { t }                from 'i18next';
import { useNavigate }      from 'react-router-dom';
import useForms             from '../../../../store/hooks/form/useForms';
import { GridRowParams }    from '@mui/x-data-grid';

export const ListExpense = () => {
    const { data, isLoading } = useGetExpenseQuery('');
  const navigate = useNavigate();

  const { setExpenseEditAction } = useForms();
  const handleRowDoubleClick = (params: GridRowParams) => {
    console.log('handleRowDoubleClick', params);
    setExpenseEditAction(params.row);
    navigate(`/admin/expense/edit/${params.row.id}`);
  }


    return (
        <>
            <ViewTitle title= {t('list_expense')}>
                <SgLink label={t('create_expense')} to="/admin/expense/create"/>
            </ViewTitle>
            <div style={{ height: '70vh', width: '100%' }}>
                <SgTable
                    columns={ColumnsExpense}
                    data={ data?.data || []}
                    onRowDoubleClick={handleRowDoubleClick}
                    isLoading={isLoading}/>
            </div>
        </>
    )
}

