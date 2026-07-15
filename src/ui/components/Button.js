import React, { memo, useState } from 'react';
import { Image } from 'expo-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const googleIcon = require('../../assets/google.png');

const Button = ({
  text,
  onPress,
  btnStyle,
  btnClassName,
  btnType,
  imageSource,
  imageStyle,
  imageClassName,
  textStyle,
  contentFit = 'contain',
  ...props
}) => {
  const pressed = useSharedValue(false);
  const [pressMotion] = useState(() => ({
    scalePressed: 0.96,
    scaleRest: 1,
    damping: 15,
    transitionMs: 200,
  }));

  const press = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
      onPress?.();
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
        className={`btn-base ${btnClassName ?? ''}`.trim()}
        style={[btnStyle, animatedStyles]}
        {...props}
      >
        {btnType === 'google' ? (
          <Image
            source={googleIcon}
            className={`btn-google-image ${imageClassName ?? ''}`.trim()}
            style={imageStyle}
            contentFit="cover"
            cachePolicy="memory"
            transition={pressMotion.transitionMs}
          />
        ) : (
          <></>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

export default memo(Button);
