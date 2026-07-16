import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VinylRecord from "../ui/VinylRecord";
import ToneArm from "../ui/ToneArm";
import NavBar from "../../navigation/ui/NavBar";
import Menu from "../../menu/ui/Menu";
import Player from "../ui/Player";

const MusicPlayer = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#323136',
                paddingTop: 32,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                }}
            >
                <NavBar />
                <Text
                    style={{
                        padding: 16,
                        fontSize: 24,
                        color: '#F5F5F5',
                        alignSelf: 'center',
                        letterSpacing: 1,
                    }}
                >
                    VINYL
                </Text>
                <Menu />
            </View>
            <VinylRecord />
            <Player />
        </SafeAreaView>
    );
};
export default MusicPlayer;
