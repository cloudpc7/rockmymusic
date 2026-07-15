import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import authEn from './auth.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: { en: { auth: authEn } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export const mapAuthCodeToKey = (code) => {
  if (!code) return 'auth:errors.generic';
  const clean = String(code).trim();
  if (clean.startsWith('auth:')) return clean;
  if (clean.toLowerCase().includes('cancel')) return 'auth:errors.google_cancelled';
  const map = {
    'auth/invalid-phone-number': 'auth:errors.invalid_phone',
    'auth/invalid-verification-code': 'auth:errors.invalid_otp',
    'auth/network-request-failed': 'auth:errors.network_error',
  };
  return map[clean] || 'auth:errors.generic';
};

export default i18n;