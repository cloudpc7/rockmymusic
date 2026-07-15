import '../global.css';
import '../nativewind-interop';
import * as Font from 'expo-font';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { store, persistor } from '../redux/store';
import LoadingScreen from '../ui/components/LoadingScreen';

export default function RootLayout() {
  const [appMounted, setAppMounted] = useState(true);
  const [introVisible, setIntroVisible] = useState(false);
  // Soft dissolve while the last intro frames still play.
  const [crossfadeMs] = useState(950);
  const introOpacity = useSharedValue(0);
  const appOpacity = useSharedValue(1);

  useEffect(() => {
    Font.loadAsync({
      'Futura-Bold': require('../assets/Futura-Bold.ttf'),
    }).catch(() => { });
  }, []);

  const hideIntro = useCallback(() => {
    setIntroVisible(false);
  }, []);

  const handleIntroFinish = useCallback(() => {
    setAppMounted(true);

    const fade = {
      duration: crossfadeMs,
      easing: Easing.bezier(0.22, 0.61, 0.36, 1),
    };

    requestAnimationFrame(() => {
      appOpacity.value = withTiming(1, fade);
      introOpacity.value = withTiming(0, fade, (finished) => {
        if (finished) {
          runOnJS(hideIntro)();
        }
      });
    });
  }, [appOpacity, crossfadeMs, hideIntro, introOpacity]);

  // Reanimated opacity — must stay as animated styles (not className).
  const introAnimStyle = useAnimatedStyle(() => ({
    opacity: introOpacity.value,
  }));

  const appAnimStyle = useAnimatedStyle(() => ({
    opacity: appOpacity.value,
  }));

  return (
    <GestureHandlerRootView className="screen-root">
      <SafeAreaProvider>
        <Provider store={store}>
          <View className="screen-root">
            {appMounted && (
              <Animated.View className="screen-root" style={appAnimStyle}>
                <PersistGate loading={null} persistor={persistor}>
                  <Slot />
                </PersistGate>
              </Animated.View>
            )}

            {introVisible && (
              <Animated.View
                className="intro-layer"
                style={introAnimStyle}
                pointerEvents={appMounted ? 'none' : 'auto'}
              >
                <LoadingScreen onFinish={handleIntroFinish} />
              </Animated.View>
            )}
          </View>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
