import { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import { Menu } from 'lucide-react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';


const NavBar = () => {
    return (
        <Pressable>
            <Menu
                color="#B4BFB9"
                size={24}
                strokeWidth={0.5}
            />
        </Pressable>
    );
};
export default NavBar;