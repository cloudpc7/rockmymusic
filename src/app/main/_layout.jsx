import { Stack } from "expo-router";

const mainLayout = () => {
    return (
        <Stack
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen />
        </Stack>
    )
}

export default mainLayout;