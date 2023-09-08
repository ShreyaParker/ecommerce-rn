import React from 'react';
import {Platform, SafeAreaView, Text} from "react-native";

const HomeScreen = () => {
    return (
        <SafeAreaView style={{
            paddingTop: Platform.OS === "android" ? 40 : 0,
            flex:1,
            backgroundColor:"white"
        }}>
            <Text>
                Login Success
            </Text>
        </SafeAreaView>
    );
};

export default HomeScreen;