import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlince'

export const store = configureStore({
    reducer : {
        auth: authReducer
    }
})