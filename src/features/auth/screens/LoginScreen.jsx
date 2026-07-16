import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import AppImage from '../../../ui/components/AppImage';
import Button from '../../../ui/components/Button';
import Input from '../../../ui/components/Input';
import RockTitle from '../../../ui/components/RockTitle';
import { colors } from '../../../theme/colors';

const musicManImage = require('../../../assets/rockmymusicman.png');

const LoginScreen = () => {
  const insets = useSafeAreaInsets();

  const [enterMotion] = useState(() => ({
    enterDelayMs: 120,
    fadeMs: 680,
    staggerMs: 90,
    titleOffsetY: 18,
    figureOffsetY: 16,
    formOffsetY: 16,
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

  };

  return (
    <View className="login-screen">
      <LinearGradient
        colors={['#2a2a2c', '#1a1a1c', '#121214', '#1c1c1e']}
        locations={[0, 0.35, 0.7, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="login-bg"
        style={StyleSheet.absoluteFill}
      />

      <View
        className="login-overlay"
        style={{
          paddingTop: Math.max(insets.top, 16),
          paddingBottom: Math.max(insets.bottom, 24),
        }}
      >
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
            keyboardType="phone-pad"
            autoComplete="tel"
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

const styles = StyleSheet.create({
  inputGlow: {
    shadowColor: '#D4A84B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 10,
  },
});
