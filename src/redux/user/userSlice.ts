// redux/user/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store'; // Assure-toi que tu as bien configuré le store
import axios from 'axios';

type Language = {
  id: string;
  name: string;
};

type Certification = {
  id: string;
  name: string;
  organization: string;
  date: string;
};

type Education = {
  id: string;
  degree: string;
  school: string;
  location: string;
  start: string;
  end?: string;
  description: string;
};

type Project = {
  id: string;
  title: string;
  url: string;
  description: string
}

type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  start: string;
  end?: string;
  description: string;
};

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  portfolio?: string;
  summary?: string;
  skills?: string;
  hobbies?: string;
  Language: Language[];
  Certification: Certification[];
  Education: Education[];
  Project: Project[]
  Experience: Experience[];
  createdAt: string;
}

interface UserState {
  user: User | null;
  currentUser: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: UserState = {
  user: null,
  currentUser: null,
  status: 'idle',
  error: null,
};

// Thunks pour appeler l'API
export const fetchUser = createAsyncThunk<User, string>(
  'user/fetchUser',
  async (userId: string) => {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  }
);

export const updateUser = createAsyncThunk<User, { id: string; data: FormData }>(
  'user/updateUser',
  async ({ id, data }) => {
    const response = await axios.put(`/api/users/${id}`, data);
    return response.data;
  }
);

export const fetchcurrentUser = createAsyncThunk(
  "user/currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/me", { withCredentials: true });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Erreur inconnue");
      }
      return rejectWithValue("Erreur inconnue");
    }
  }
);

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchcurrentUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchcurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload
      })
      .addCase(fetchcurrentUser.rejected, (state) => {
        state.status = 'failed';
        state.error = "An error occured"
      })

      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user data';
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update user data';
      });
  },
});

// Selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;
export const selectCurrentUser = (state: RootState) => state.user.currentUser

export default userSlice.reducer;
