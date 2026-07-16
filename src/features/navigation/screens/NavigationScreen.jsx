import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import NavBar from '../ui/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';

const NavigationScreen = () => {
    return (
        <SafeAreaView
        >
            <NavBar />
        </SafeAreaView>
    );
};

export default NavigationScreen;