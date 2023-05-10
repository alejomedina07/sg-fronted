import useGlobalStore from '../../../../../store/hooks/useGlobalStore';
import {
  inventorySliceProps,
  closeModalInventory,
  openModalInventory,
  openModalInventoryProps,
  selectInventory,
} from '../slices/inventorySlice';

function useInventory() {
  const { dispatch, useTypedSelector } = useGlobalStore();
  const { inventory, isOpenModalInventory, refresh, onClose, customer } =
    useTypedSelector(({ core }: any) => core.inventory);

  const selectInventoryAction = (payload: inventorySliceProps) =>
    dispatch(selectInventory(payload));

  const closeModalInventoryAction = () => dispatch(closeModalInventory());

  // const openModalInventoryAction = (data:openModalInventoryProps) => dispatch( openModalInventory(data) )

  return {
    inventory,
    closeModalInventoryAction,
    customer,
    isOpenModalInventory,
    // openModalInventoryAction,
    onClose,
    refresh,
    selectInventoryAction,
  };
}

export default useInventory;
