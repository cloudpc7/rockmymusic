import { useState } from 'react';
import { View } from 'react-native';
import AppImage from './AppImage';
import { colors } from '../../theme/colors';

// Exact logo from design reference
const titleImage = require('../../assets/rockmymusic-title.png');

const RockTitle = () => {
  const [glow] = useState(() => ({
    color: colors.glow,
    radius: 32,
    opacity: 0.5,
  }));

  return (
    <View className="rock-title-wrap">
      <AppImage
        source={titleImage}
        className="rock-title-image"
        contentFit="contain"
        glow
        glowColor={glow.color}
        glowRadius={glow.radius}
        glowOpacity={glow.opacity}
        dropShadow
        accessibilityLabel="ROCKMYMUSIC"
      />
    </View>
  );
};

export default RockTitle;
