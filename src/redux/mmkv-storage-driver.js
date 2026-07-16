import { createMMKV } from 'react-native-mmkv';

/**
 * Prefer MMKV when the native module is available (dev client / production).
 * Fall back to an in-memory Map so a missing native module cannot hang
 * app boot at the Metro 99.9% splash (common with Expo Go / incomplete rebuilds).
 */
function createStorage() {
  try {
    return createMMKV();
  } catch (error) {
    console.warn('[mmkv] native module unavailable, using memory storage', error);
    const map = new Map();
    return {
      getString: (key) => map.get(key),
      set: (key, value) => {
        map.set(key, value);
      },
      delete: (key) => {
        map.delete(key);
      },
    };
  }
}

export const storage = createStorage();

export const mmkvStorageDriver = {
  getItem: (key) => {
    try {
      return Promise.resolve(storage.getString(key) ?? null);
    } catch (error) {
      console.warn('[mmkv] getItem failed', error);
      return Promise.resolve(null);
    }
  },
  setItem: (key, value) => {
    try {
      storage.set(key, value);
    } catch (error) {
      console.warn('[mmkv] setItem failed', error);
    }
    return Promise.resolve(true);
  },
  removeItem: (key) => {
    try {
      storage.delete(key);
    } catch (error) {
      console.warn('[mmkv] removeItem failed', error);
    }
    return Promise.resolve();
  },
};
