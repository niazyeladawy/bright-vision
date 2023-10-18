import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginAsync = createAsyncThunk('auth/login', async (credentials) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
});


export const refreshAccessToken = createAsyncThunk('auth/refreshToken', async (refreshToken) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, { refreshToken });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.role = null; // Reset the role on logout
        },
        // Add more rules here
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            // state.role = action.payload.role;
            state.role = 'admin';
            state.error = null;
        });

        builder.addCase(loginAsync.rejected, (state, action) => {



            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.role = null;
            state.error = action.payload;
        });

        builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
            state.token = action.payload.accessToken;
            state.error = null;
        });

        builder.addCase(refreshAccessToken.rejected, (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.role = null;
            state.error = action.payload;
        });
    },
});

export const { login, logout, setUser, setToken, setRole } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectAuth = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.role;