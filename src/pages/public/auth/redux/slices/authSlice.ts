import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return { userConnected: null, authenticated: false, token: '' };
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return { userConnected: null, authenticated: false, token: '' };
  }
};

const initialState = loadState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addLogin: (state, action) => {
      state.userConnected = action.payload;
      state.token = action.payload.token;
      state.authenticated = true;
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    },
    addLogout: (state) => {
      state.userConnected = null;
      state.authenticated = false;
      state.token = '';
      localStorage.setItem('state', '');
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLogin, addLogout } = authSlice.actions;

export default authSlice.reducer;
