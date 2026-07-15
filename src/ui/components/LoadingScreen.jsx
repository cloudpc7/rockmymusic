import { useEffect } from 'react';
import { View } from 'react-native';

/**
 * LoadingScreen renders a lightweight fallback view during initialization.
 * The heavy animated WebP intro has been removed to prevent system crashes.
 */
export default function LoadingScreen({ onFinish }) {
  useEffect(() => {
    onFinish?.();
  }, [onFinish]);

  return (
    <View className="loading-screen" />
  );
}
