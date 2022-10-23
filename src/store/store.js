import {configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import authSlice from "./reducer";


const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, authSlice)

export const store = configureStore({
    reducer:{
        auth : persistedReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware:[thunk]
})


export const persistor = persistStore(store)