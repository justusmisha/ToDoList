import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  showLoginModal: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  showLoginModal: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setShowLoginModal: (state, action: PayloadAction<boolean>) => {
      state.showLoginModal = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { setLoggedIn, setShowLoginModal, logout } = authSlice.actions;
export default authSlice.reducer;
