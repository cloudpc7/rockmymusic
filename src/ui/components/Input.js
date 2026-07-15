import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const InputField = ({
  inputStyle,
  containerStyle,
  inputClassName,
  containerClassName,
  placeholder,
  placeholderTextColor,
  ...props
}) => {
  const pressed = useSharedValue(false);
  const [pressMotion] = useState(() => ({
    scalePressed: 0.98,
    scaleRest: 1,
    damping: 20,
  }));

  const press = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  // Press scale must stay as Reanimated style.
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(
          pressed.value ? pressMotion.scalePressed : pressMotion.scaleRest,
          { damping: pressMotion.damping },
        ),
      },
    ],
  }));

  return (
    <GestureDetector gesture={press}>
      <Animated.View
        className={containerClassName}
        style={[containerStyle, animatedStyles]}
      >
        <TextInput
          className={inputClassName}
          style={inputStyle}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor ?? colors.muted}
          {...props}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default InputField;
