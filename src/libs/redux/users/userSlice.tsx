import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Iuser } from '../../../../global';

interface ISetUserPayload {
  user: Iuser;
  accessToken: string;
}

interface IUpdateUserPayload {
  name?: string;
  avatarUrl?: string | null;
  coverPhotoUrl?: string | null;
  bio?: string;
}

export interface UserState {
  data: Iuser;
  accessToken: string;
  isAuthenticated: boolean;
}

// Check if running in browser
const isClient = typeof window !== 'undefined';

const getInitialStateFromLocalStorage = (): UserState => {
  if (isClient) {
    const userFromLocalStorage = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const accessToken = localStorage.getItem('accessToken');

    if (userFromLocalStorage && isAuthenticated === 'true' && accessToken) {
      return {
        data: JSON.parse(userFromLocalStorage),
        accessToken,
        isAuthenticated: true,
      };
    }
  }

  // Return default state if not in client or no user data in localStorage
  return {
    data: {
      _id: '',
      name: '',
      email: '',
      role: 'user',
      avatarUrl: null,
      coverPhotoUrl: null,
      bio: undefined,
      isActive: false,
    },
    accessToken: '',
    isAuthenticated: false,
  };
};

const initialState: UserState = getInitialStateFromLocalStorage();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ISetUserPayload>) => {
      state.data = action.payload.user;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;

      // Store to localStorage on the client side
      if (isClient) {
        localStorage.setItem('user', JSON.stringify(state.data));
        localStorage.setItem('isAuthenticated', `${state.isAuthenticated}`);
        localStorage.setItem('accessToken', state.accessToken);
      }
    },

    updateUser: (state, action: PayloadAction<IUpdateUserPayload>) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };

      // Store updated data to localStorage on the client side
      if (isClient) {
        localStorage.setItem('user', JSON.stringify(state.data));
      }
    },

    resetUser: (state) => {
      state.data = {
        _id: '',
        name: '',
        email: '',
        role: 'user',
        avatarUrl: null,
        coverPhotoUrl: null,
        bio: undefined,
        isActive: false,
      };
      state.accessToken = '';
      state.isAuthenticated = false;

      // Clear from localStorage on the client side
      if (isClient) {
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('accessToken');
      }
    },
  },
});

export const { setUser, resetUser, updateUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
