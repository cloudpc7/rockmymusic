import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

export const mmkvStorageDriver = {
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