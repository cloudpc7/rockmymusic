import { Ellipsis } from "lucide-react-native";
import { Pressable } from "react-native";

const Menu = () => {
    const handlePress = () => { };

    return (
        <Pressable
            onPress={handlePress}
            hitSlop={12}
            style={{
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Ellipsis
                color="#B4BfB9"
                size={24}
                strokeWidth={1}
                style={{ marginBottom: - 5 }}
            />
            <Ellipsis
                color="#B4BfB9"
                size={24}
                strokeWidth={1}
                style={{ marginTop: -10 }}
            />
        </Pressable>
    );
};

export default Menu;
