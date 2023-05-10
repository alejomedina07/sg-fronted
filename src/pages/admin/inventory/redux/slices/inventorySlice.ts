import { createSlice } from '@reduxjs/toolkit';

export interface inventorySliceProps {
  isOpenModalInventory: boolean;
  inventory?: Inventory | null;
  refresh?: () => void;
  onClose?: () => void;
}

export interface openModalInventoryProps {
  refresh?: () => void;
  onClose?: () => void;
}

const initialState: inventorySliceProps = { isOpenModalInventory: false };

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    selectInventory: (state, action) => {
      state.inventory = action.payload.inventory;
      state.refresh = action.payload.refresh;
      state.onClose = action.payload.onClose;
      state.isOpenModalInventory = true;
    },
    closeModalInventory: (state) => {
      state.inventory = null;
      state.isOpenModalInventory = false;
    },
    openModalInventory: (state, action) => {
      state.inventory = null;
      state.isOpenModalInventory = true;
      state.refresh = action.payload.refresh;
      state.onClose = action.payload.onClose;
    },
  },
});

// Action creators are generated for each case reducer function
export const { closeModalInventory, selectInventory, openModalInventory } =
  inventorySlice.actions;

export default inventorySlice.reducer;
