import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import tokenRefreshMiddleware from './features/auth/refreshAccessToken'

 const store = configureStore({
    reducer: {
        auth: authReducer
    },

    middleware: [...getDefaultMiddleware(), tokenRefreshMiddleware],
})


export default store
