import {ViewTitle} from "../../components/share/title/ViewTitle";
import {SgLink} from "../../../../components/form/button/SgLink";
import {SgTable} from "../../../../components/table/SgTable";
import {ColumnsInventory} from "../helpers/columnsInventory";
import {useGetInventoryQuery} from "../redux/api/inventoryApi";

export const ListInventory = () => {
    const { data, isLoading } = useGetInventoryQuery('');
    console.log(22, data);
    return (
        <>
            <ViewTitle title="list_inventory">
        <SgLink label="create_inventory" to="/admin/inventory/create"/>
        </ViewTitle>
        <div style={{ height: '70vh', width: '100%' }}>
    <SgTable
        columns={ColumnsInventory}
    data={ data?.data || []}
    isLoading={isLoading}/>
    </div>
    </>

)

}