import { useState } from 'react';
import { View, Pressable, Text, StyleSheet, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react-native';

const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const ICON_WHITE = '#FFFFFF';

const PlayerControls = () => {
    const [audioSource] = useState(null);
    const [isSeeking, setIsSeeking] = useState(false);
    const [seekValue, setSeekValue] = useState(0);

    const player = useAudioPlayer(audioSource);
    const status = useAudioPlayerStatus(player);

    const duration = status?.duration ?? 0;
    const currentTime = status?.currentTime ?? 0;
    const playing = status?.playing ?? false;

    const sliderValue = isSeeking ? seekValue : currentTime;

    const handleSlidingStart = () => {
        setIsSeeking(true);
        setSeekValue(currentTime);
    };

    const handleValueChange = (value) => {
        setSeekValue(value);
    };

    const handleSlidingComplete = async (value) => {
        setIsSeeking(false);
        if (duration > 0) {
            await player.seekTo(value);
        }
    };

    const handlePlayPause = () => {
        if (playing) {
            player.pause();
        } else {
            player.play();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.sliderRow}>
                <Text style={styles.time}>{formatTime(sliderValue)}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={duration > 0 ? duration : 1}
                    value={sliderValue}
                    onSlidingStart={handleSlidingStart}
                    onValueChange={handleValueChange}
                    onSlidingComplete={handleSlidingComplete}
                    minimumTrackTintColor="#F5F5F5"
                    maximumTrackTintColor="#3A3A3E"
                    thumbTintColor="#F5F5F5"
                    disabled={duration <= 0}
                />
                <Text style={styles.time}>
                    -{formatTime(Math.max(0, duration - sliderValue))}
                </Text>
            </View>

            <View style={styles.controls}>
                <Pressable onPress={() => { }} style={styles.iconBtn} hitSlop={12}>
                    <SkipBack color={ICON_WHITE} size={28} strokeWidth={1.5} />
                </Pressable>
                <Pressable
                    onPress={handlePlayPause}
                    style={styles.playBtnOuter}
                    accessibilityRole="button"
                    accessibilityLabel={playing ? 'Pause' : 'Play'}
                >
                    <LinearGradient
                        colors={['#FDFEFF', '#818181']}
                        style={styles.outerRing}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                    >

                        <LinearGradient
                            colors={['#020E12', '#020E12']}
                            style={styles.innerRim}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0.25, y: 0.25 }}
                        >
                            <LinearGradient
                                colors={['#A6A9Ae', '#3E3F44', '#242328']}
                                locations={[0, 0.5, 1]}
                                style={styles.buttonFace}
                                start={{ x: 0.1, y: 0.1 }}
                                end={{ x: 0.1, y: 1 }}
                            >
                                <Play
                                    size={24}
                                    color="#FDFFFE"
                                />
                            </LinearGradient>
                        </LinearGradient>
                    </LinearGradient>
                </Pressable>

                <Pressable onPress={() => { }} style={styles.iconBtn} hitSlop={12}>
                    <SkipForward color={ICON_WHITE} size={28} strokeWidth={1.5} />
                </Pressable>
            </View>
        </View>
    );
};

export default PlayerControls;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    sliderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: 8,
    },
    slider: {
        flex: 1,
        height: 40,
    },
    time: {
        color: '#A1A2A6',
        fontSize: 12,
        fontWeight: '300',
        minWidth: 36,
        textAlign: 'center',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        gap: 40,
    },
    icon: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 3,
    },
    playBtnOuter: {
        shadowColor: '#444645',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.6,
        shadowRadius: 16,
        elevation: 20,
    },
    outerRing: {
        width: 84,
        height: 84,
        borderRadius: 45,
        padding: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerRim: {
        width: '100%',
        height: '100%',
        borderRadius: 41,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonFace: {
        width: 76,
        height: 76,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#05060A',
    }
});
