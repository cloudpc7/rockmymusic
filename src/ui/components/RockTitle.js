import { Text, View, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Brand wordmark — pure gold 3D look (matches rockmymusicbackground.png).
 * No cyan outline / neon glow.
 */
const RockTitle = ({ className }) => {
  return (
    <View
      className={`rock-title-wrap ${className ?? ''}`.trim()}
      accessibilityRole="header"
      accessibilityLabel="RockMyMusic"
    >
      <View className="rock-title-stack">
        {/* Soft depth shadow under the gold letters */}
        <Text
          className="rock-title-text"
          style={styles.depthShadow}
          pointerEvents="none"
        >
          RockMyMusic
        </Text>

        {/* Warm gold bevel edge */}
        <Text
          className="rock-title-text"
          style={styles.bevel}
          pointerEvents="none"
        >
          RockMyMusic
        </Text>

        {/* Metallic gold fill */}
        <MaskedView
          style={styles.mask}
          maskElement={
            <Text className="rock-title-text" style={styles.maskText}>
              RockMyMusic
            </Text>
          }
        >
          <LinearGradient
            colors={[
              '#FFF6D6',
              '#F0D28A',
              '#D4A84B',
              '#B8862D',
              '#E8C56A',
              '#FFF0C2',
            ]}
            locations={[0, 0.22, 0.45, 0.58, 0.8, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradient}
          >
            <Text className="rock-title-text" style={styles.invisibleTwin}>
              RockMyMusic
            </Text>
          </LinearGradient>
        </MaskedView>
      </View>
    </View>
  );
};

export default RockTitle;

// Depth / bevel need RN StyleSheet (offset shadows aren’t pure NativeWind).
const styles = StyleSheet.create({
  depthShadow: {
    color: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 3,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: { width: 0, height: 6 },
    textShadowRadius: 10,
  },
  bevel: {
    color: '#8A6918',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 1.5,
    textAlign: 'center',
    opacity: 0.9,
  },
  mask: {
    alignSelf: 'center',
  },
  maskText: {
    color: '#000',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  gradient: {
    alignItems: 'center',
  },
  invisibleTwin: {
    opacity: 0,
    textAlign: 'center',
  },
});
