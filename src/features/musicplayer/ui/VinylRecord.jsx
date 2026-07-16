import { Image } from "expo-image";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    Easing,
    cancelAnimation,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";

import ToneArm from "./ToneArm";

const vinylRecord = require('../../../assets/vinyl-record.png');

const VinylRecord = () => {
    const spin = useSharedValue(0);
    const isSpinning = useSharedValue(false);

    const tap = Gesture.Tap().onStart(() => {
        if (isSpinning.value) {
            cancelAnimation(spin);
            isSpinning.value = false;
        } else {
            isSpinning.value = true;
            spin.value = withRepeat(
                withTiming(spin.value + 360, {
                    duration: 2000,
                    easing: Easing.linear,
                }),
                -1,
                false,
            );
        }
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${spin.value}deg` }],
    }));

    return (
        <GestureDetector gesture={tap}>
            <Animated.View
                style={{
                    width: '100%',
                    aspectRatio: 990 / 880,
                    alignSelf: 'center',
                }}
            >
                <Animated.View
                    style={[
                        animatedStyle,
                        {
                            width: '100%',
                            height: '100%',
                            paddingHorizontal: 16,
                        },
                    ]}
                >
                    <Image
                        source={vinylRecord}
                        contentFit="contain"
                        contentPosition="top"
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </Animated.View>
                <ToneArm />
            </Animated.View>
        </GestureDetector>
    );
};

export default VinylRecord;

const styles = StyleSheet.create({});
