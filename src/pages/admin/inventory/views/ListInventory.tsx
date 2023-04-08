import {ViewTitle}            from '../../components/share/title/ViewTitle';
import {SgLink}               from '../../../../components/form/button/SgLink';
import {SgTable}              from '../../../../components/table/SgTable';
import {ColumnsInventory}     from '../helpers/columnsInventory';
import {useGetInventoryQuery} from '../redux/api/inventoryApi';
import {t}                    from 'i18next';
import { useNavigate }        from 'react-router-dom';
import useForms               from '../../../../store/hooks/form/useForms';
import { GridRowParams }      from '@mui/x-data-grid';

export const ListInventory = () => {
    const { data, isLoading } = useGetInventoryQuery('');
    const navigate = useNavigate();
    const  { setInventoryEditAction } = useForms();
    const handleRowDoubleClick = (params: GridRowParams) => {
        console.log('handleRowDoubleClick', params);
        setInventoryEditAction(params.row)
        navigate(`/admin/inventory/edit/${params.row.id}`)
    }


    return (
        <>
            <ViewTitle title={t('list_inventory')}>
        <SgLink label={t('create_inventory')} to="/admin/inventory/create"/>
        </ViewTitle>
        <div style={{ height: '70vh', width: '100%' }}>
    <SgTable
        columns={ColumnsInventory}
        data={ data?.data || []}
        onRowDoubleClick={handleRowDoubleClick}
        isLoading={isLoading}/>
    </div>
    </>

)

}