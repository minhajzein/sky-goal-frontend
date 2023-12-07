import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import { apiSlice } from '../apis/apiSlice'

// =================================================================

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => {
        const allMiddlewares = [apiSlice.middleware]
        return getDefaultMiddleware({
            serializableCheck: false
        }).concat(...allMiddlewares)
    }
})


export default store