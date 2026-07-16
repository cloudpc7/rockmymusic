import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import appReducer from './slices/app.slice';
import authReducer from './slices/auth.slice';
import { mmkvStorageDriver } from './mmkv-storage-driver';

const persistConfig = {
    key: 'root',
    storage: mmkvStorageDriver,
    whitelist: ['auth'],
    blacklist: ['app'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
