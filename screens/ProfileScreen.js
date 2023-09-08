import React from 'react';
import { Text, SafeAreaView, Platform} from "react-native";

const ProfileScreen = () => {
    return (
        <SafeAreaView
            style={{
                paddingTop: Platform.OS === "android" ? 40 : 0,
                flex:1,
                backgroundColor:"white"
            }}
        >
            <Text>
                Profile screen
            </Text>
        </SafeAreaView>
    );
};

export default ProfileScreen;