import { Text, View, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../ui/components/Button";



const Login = () => {

    const dispatch = useDispatch();

    const handleGoogleSignIn = () => {
        return;
    }

    return (
        <View
        >
            <Button
                onPress={handleGoogleSignIn}
            />
        </View>

    )
};

export default Login;
