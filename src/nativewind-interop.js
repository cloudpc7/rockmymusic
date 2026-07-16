/**
 * Register className support on third-party components NativeWind
 * does not style by default.
 */
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';

cssInterop(Image, { className: 'style' });
cssInterop(LinearGradient, { className: 'style' });
