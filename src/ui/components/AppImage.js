import React, { memo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { colors } from '../../theme/colors';

/**
 * Shared image primitive for UI refactor.
 * Prefer this over raw RN Image for logos, titles, and decorative art.
 *
 * glow — soft bloom underlay + drop shadow so assets sit into dark neon screens
 *
 * StyleSheet kept for absolute bloom layer + dynamic iOS shadow props
 * (shadowColor/radius vary with glow props and are not static classNames).
 */
const AppImage = ({
  source,
  style,
  className,
  contentFit = 'contain',
  transition,
  cachePolicy = 'memory-disk',
  blurRadius,
  accessibilityLabel,
  glow = false,
  glowColor,
  glowRadius,
  glowOpacity,
  dropShadow = true,
  ...props
}) => {
  const [glowDefaults] = useState(() => ({
    color: colors.glow,
    radius: 28,
    opacity: 0.55,
    transitionMs: 200,
    bloomScale: 1.06,
    shadowOffsetY: 12,
    shadowOpacity: 0.95,
    elevation: 18,
    blurFloor: 12,
    blurFactor: 0.55,
  }));

  const resolvedColor = glowColor ?? glowDefaults.color;
  const resolvedRadius = glowRadius ?? glowDefaults.radius;
  const resolvedOpacity = glowOpacity ?? glowDefaults.opacity;
  const resolvedTransition = transition ?? glowDefaults.transitionMs;

  if (!glow) {
    return (
      <ExpoImage
        source={source}
        className={className}
        style={style}
        contentFit={contentFit}
        transition={resolvedTransition}
        cachePolicy={cachePolicy}
        blurRadius={blurRadius}
        accessibilityLabel={accessibilityLabel}
        {...props}
      />
    );
  }

  // Dynamic shadow values depend on props — StyleSheet is required here.
  const shadowStyle = dropShadow
    ? {
        shadowColor: resolvedColor,
        shadowOffset: { width: 0, height: glowDefaults.shadowOffsetY },
        shadowOpacity: glowDefaults.shadowOpacity,
        shadowRadius: resolvedRadius,
        elevation: glowDefaults.elevation,
      }
    : null;

  const bloomBlur = Math.max(
    glowDefaults.blurFloor,
    Math.round(resolvedRadius * glowDefaults.blurFactor),
  );

  return (
    <View className={`img-frame ${className ?? ''}`.trim()} style={[shadowStyle, style]}>
      <ExpoImage
        source={source}
        style={[
          styles.bloom,
          {
            opacity: resolvedOpacity,
            transform: [{ scale: glowDefaults.bloomScale }],
          },
        ]}
        contentFit={contentFit}
        cachePolicy={cachePolicy}
        blurRadius={bloomBlur}
        pointerEvents="none"
        accessible={false}
      />

      <ExpoImage
        source={source}
        className="img-fill"
        style={styles.main}
        contentFit={contentFit}
        transition={resolvedTransition}
        cachePolicy={cachePolicy}
        accessibilityLabel={accessibilityLabel}
        {...props}
      />
    </View>
  );
};

export default memo(AppImage);

// Absolute bloom + main fill: dynamic opacity/transform need StyleSheet merge.
const styles = StyleSheet.create({
  bloom: {
    ...StyleSheet.absoluteFillObject,
  },
  main: {
    width: '100%',
    height: '100%',
  },
});
