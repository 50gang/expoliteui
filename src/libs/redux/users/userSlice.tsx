import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { initialUserState } from '../../utils/initialUserState.utils';
import { Iuser } from '../../../../global';

interface ISetUserPayload {
  user: Iuser;                // ✅ singular
  accessToken: string;
};

interface IUpdateUserPayload {
  name?: string;
  avatarUrl?: string | null;
  coverPhotoUrl?: string | null;
  bio?: string;
}

// Define a type for the slice state
export interface UserState {
  data: Iuser;
  accessToken: string;
  isAuthenticated: boolean;
}

// Define the initial state using that type
const initialState: UserState = initialUserState()

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ISetUserPayload>) => {
      state.data = action.payload.user;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;

      // Store to localStorage
      localStorage.setItem('user', JSON.stringify(state.data));
      localStorage.setItem('isAuthenticated', `${state.isAuthenticated}`);
      localStorage.setItem('accessToken', state.accessToken);
    },

    updateUser: (state, action: PayloadAction<IUpdateUserPayload>) => {
      state.data = {
        ...state.data,
        ...action.payload,
      }

      localStorage.setItem('user', JSON.stringify(state.data));
    },

    resetUser: (state) => {
      state.data = {
        _id: "",
        name: "",
        email: "",
        role: "user",
        avatarUrl: null,
        coverPhotoUrl: null,
        bio: undefined,
        isActive: false,
      };
      state.accessToken = '';
      state.isAuthenticated = false;

      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('accessToken');
    },
  },
});

export const { setUser, resetUser, updateUser } = userSlice.actions;

// Selector
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
