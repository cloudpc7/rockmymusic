import { View, Text, StyleSheet } from 'react-native';
import PlayerControls from './PlayerControls';

const Player = () => {
    return (
        <View style={styles.playerContainer}>
            <Text style={styles.title}>Midnight Vinyl</Text>
            <Text style={styles.artist}>Echo Collective</Text>
            <PlayerControls />
        </View>
    );
};

export default Player;

const styles = StyleSheet.create({
    playerContainer: {
        width: '100%',
        marginTop: 24,
        paddingBottom: 16,
    },
    title: {
        fontSize: 24,
        color: '#F5F5F5',
        alignSelf: 'center',
    },
    artist: {
        fontSize: 16,
        fontWeight: '300',
        alignSelf: 'center',
        padding: 8,
        color: '#C8C8C8',
    },
});
