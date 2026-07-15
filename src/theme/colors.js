/**
 * JS color tokens for APIs that cannot use NativeWind className
 * (placeholderTextColor, shadowColor, glow props, etc.).
 *
 * Keep in sync with:
 * - src/global.css → :root
 * - tailwind.config.js → theme.extend.colors.rmm
 */
export const colors = {
  navy: '#04203c',
  cyan: '#00FFFF',
  glow: '#00E5FF',
  ink: '#0d0d0d',
  muted: '#9aa0a6',
  white: '#ffffff',
  transparent: 'transparent',
  vinyl: 'hsl(210,8%,11%)',
};

export default colors;
