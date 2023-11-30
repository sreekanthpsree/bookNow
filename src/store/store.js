import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./features/auth-slice";
import modalReducer from "./features/modal-slice";

export const store = configureStore({
    reducer: {
        authReducer,
        modalReducer
    }
})
