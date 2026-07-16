import { View } from "react-native";
import { Image } from "expo-image";

const toneArmImage = require('../../../assets/tonearm.png');

const ToneArm = () => {
    return (
        <Image
            source={toneArmImage}
            contentFit="contain"
            style={{
                width: 130,
                height: 280,
                position: 'absolute',
                top: -8,
                right: 12,
            }}
        />
    )
}
export default ToneArm;
