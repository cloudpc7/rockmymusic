import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Button from '../../../ui/components/Button';
import Input from '../../../ui/components/Input';
import RockTitle from '../../../ui/components/RockTitle';
import AppImage from '../../../ui/components/AppImage';
import { colors } from '../../../theme/colors';


const musicManImage = require('../../../../assets/rockman-v2.png');

const LoginScreen = () => {
  // Rise under the intro dissolve so UI doesn't "pop" after the video freezes.
  const [enterMotion] = useState(() => ({
    enterDelayMs: 120,
    fadeMs: 680,
    staggerMs: 90,
    titleOffsetY: 14,
    figureOffsetY: 16,
    formOffsetY: 14,
  }));

  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(enterMotion.titleOffsetY);
  const figureOpacity = useSharedValue(0);
  const figureY = useSharedValue(enterMotion.figureOffsetY);
  const formOpacity = useSharedValue(0);
  const formY = useSharedValue(enterMotion.formOffsetY);

  useEffect(() => {
    const ease = Easing.bezier(0.22, 0.61, 0.36, 1);
    const { enterDelayMs, fadeMs, staggerMs } = enterMotion;
    const timing = { duration: fadeMs, easing: ease };

    titleOpacity.value = withDelay(enterDelayMs, withTiming(1, timing));
    titleY.value = withDelay(enterDelayMs, withTiming(0, timing));

    figureOpacity.value = withDelay(
      enterDelayMs + staggerMs,
      withTiming(1, timing),
    );
    figureY.value = withDelay(
      enterDelayMs + staggerMs,
      withTiming(0, timing),
    );

    formOpacity.value = withDelay(
      enterDelayMs + staggerMs * 2,
      withTiming(1, timing),
    );
    formY.value = withDelay(
      enterDelayMs + staggerMs * 2,
      withTiming(0, timing),
    );
  }, [
    enterMotion,
    figureOpacity,
    figureY,
    formOpacity,
    formY,
    titleOpacity,
    titleY,
  ]);

  // Reanimated enter motion — StyleSheet/className cannot drive shared values.
  const titleAnimStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const figureAnimStyle = useAnimatedStyle(() => ({
    opacity: figureOpacity.value,
    transform: [{ translateY: figureY.value }],
  }));

  const formAnimStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formY.value }],
  }));

  const handleGoogleSignIn = () => {
    // TODO: wire up Google sign-in
  };

  return (
    <View className="screen-center">
      <View className="login-overlay">
        <Animated.View className="login-title-wrap" style={titleAnimStyle}>
          <RockTitle />
        </Animated.View>

        <Animated.View className="login-figure-wrap" style={figureAnimStyle}>
          <AppImage
            source={musicManImage}
            className="login-figure"
            contentFit="contain"
            accessibilityLabel="Musical figure"
          />
        </Animated.View>

        <Animated.View className="login-form" style={formAnimStyle}>
          <Input
            containerClassName="login-input-shell"
            containerStyle={styles.inputGlow}
            inputClassName="login-input"
            placeholder="Enter Phone Number"
            placeholderTextColor={colors.muted}
          />
          <Button
            btnClassName="login-control"
            btnType="google"
            onPress={handleGoogleSignIn}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default LoginScreen;

// Neon glow needs RN shadow* / elevation APIs that Tailwind cannot fully express.
const styles = StyleSheet.create({
  inputGlow: {
    shadowColor: colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },
});
