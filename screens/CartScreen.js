import React from 'react';
import {Platform, SafeAreaView, Text} from "react-native";

const CartScreen = () => {
    return (
        <SafeAreaView
            style={{
                paddingTop: Platform.OS === "android" ? 40 : 0,
                flex:1,
                backgroundColor:"white"
            }}
        >
           <Text>
               Cart Screen
           </Text>
        </SafeAreaView>
    );
};

export default CartScreen;