import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import appReducer from './slices/app.slice';
import authReducer from './slices/auth.slice';
import { createMMKV } from 'react-native-mmkv';

// 1. Initialize your lightning-fast native C++ MMKV instance
export const storage = createMMKV();

const mmkvStorageDriver = {
    getItem: (key) => Promise.resolve(storage.getString(key) ?? null),
    setItem: (key, value) => {
        storage.set(key, value);
        return Promise.resolve(true);
    },
    removeItem: (key) => {
        storage.delete(key);
        return Promise.resolve(true);
    },
};

// 2. Configure Redux Persist to save session/settings securely and instantly
const persistConfig = {
    key: 'root',
    storage: mmkvStorageDriver,
    whitelist: ['auth'], // ONLY persist auth/session token data across app restarts.
    blacklist: ['app'],  // Keep your transient video slice data out of permanent storage.
};

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Configure the store with specific performance overrides
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // CRITICAL FOR OPTIMIZATION: Ignore checking serializability for internal 
            // redux-persist actions and network-heavy async functions.
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);