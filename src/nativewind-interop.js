/**
 * Register className support on third-party components NativeWind
 * does not style by default.
 */
import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';

cssInterop(Image, { className: 'style' });
