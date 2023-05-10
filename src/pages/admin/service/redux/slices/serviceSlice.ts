import { createSlice } from '@reduxjs/toolkit';

export interface serviceSliceProps {
  isOpenModalService: boolean;
  service?: Service | null;
  refresh?: () => void;
  onClose?: () => void;
  customer?: Customer | null;
}

export interface openModalServiceProps {
  refresh?: () => void;
  onClose?: () => void;
}

const initialState: serviceSliceProps = { isOpenModalService: false };

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    selectService: (state, action) => {
      state.service = action.payload;
      state.isOpenModalService = true;
    },
    selectCustomer: (state, action) => {
      state.customer = action.payload;
      state.isOpenModalService = true;
    },
    closeModalService: (state) => {
      state.service = null;
      state.customer = null;
      state.isOpenModalService = false;
    },
    openModalService: (state, action) => {
      state.service = null;
      state.customer = null;
      state.isOpenModalService = true;
      state.refresh = action.payload.refresh;
      state.onClose = action.payload.onClose;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  closeModalService,
  selectService,
  openModalService,
  selectCustomer,
} = serviceSlice.actions;

export default serviceSlice.reducer;
