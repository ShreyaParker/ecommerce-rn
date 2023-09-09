import React, {useEffect, useState} from 'react';
import {Image, KeyboardAvoidingView, Pressable, SafeAreaView, Text, TextInput, View,Alert} from "react-native";
import {MaterialIcons} from "@expo/vector-icons"
import {AntDesign} from "@expo/vector-icons"
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigation = useNavigation()

    useEffect(()=>{
        const checkLoginStatus=async () =>{
            try{
                const token = await AsyncStorage.getItem("authToken")
                if(token){
                    navigation.replace("Main")
                }
            }catch (e){
                console.log(e)
            }
        }
        checkLoginStatus()
    })

    const handleLogin = ( )=>{
        const user = {
            email: email,
            password: password,
        };

        axios
            .post("http://10.0.2.2:5000/login", user)
            .then((response) => {
                console.log(response);
                const token = response.data.token;
                AsyncStorage.setItem("authToken", token);
                navigation.replace("Main");
            })
            .catch((error) => {
                Alert.alert("Invalid email or password")
                console.log(error.message);

            });
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor:"white",alignItems:"center"}}>
            <View>
                <Image
                    source={require("../assets/amazonlogo.png")}
                    style={{ width:190, height: 100 }}
                    />
            </View>
            <KeyboardAvoidingView>
                <View>
                    <Text style={{fontSize:17 , fontWeight:"bold" , marginTop:12,color:"#041E42"}}>
                        Login In to Your Account
                    </Text>
                </View>
                <View style={{marginTop:70}}>
                    <View style={{flexDirection:"row",
                        alignItems:"center",
                        gap:5 ,
                        backgroundColor:"#D0D0D0",
                        paddingVertical:5 ,
                        borderRadius: 5,
                        marginTop:30
                    }}>
                        <MaterialIcons style={{marginLeft:8}}
                                       name={"email"} size={24}
                                       color={"grey"} />
                        <TextInput style={{color:"gray",marginVertical:10, width:300 ,fontSize:16}}
                                   value={email}
                                   onChangeText={(text) => setEmail(text)}
                                   placeholder={"Enter your Email"}
                        />
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <View style={{flexDirection:"row",
                        alignItems:"center",
                        gap:5 ,
                        backgroundColor:"#D0D0D0",
                        paddingVertical:5 ,
                        borderRadius: 5,
                        marginTop:30
                    }}>
                        <AntDesign style={{marginLeft:8}}
                                       name={"lock1"} size={24}
                                       color={"grey"} />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}

                            style={{color:"gray",marginVertical:10, width:300 ,fontSize:16}}
                                   placeholder={"Enter your Password"}
                        />
                    </View>
                </View>

                <View style={{marginTop:12,flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                    <Text>
                        Keep me logged in
                    </Text>
                    <Text style={{color:"#007FFF" ,fontWeight:"500"}}>
                        Forgot Password
                    </Text>
                </View>
                <View style={{marginTop:50}}/>
                <Pressable
                    onPress={handleLogin}
                    style={{width:200, backgroundColor:"#FEBE10" ,borderRadius:6,marginLeft:"auto",marginRight:"auto",padding:15}}>
                    <Text style={{textAlign:"center" , color:"white",fontSize:16,fontWeight:"bold"}}>
                        Login
                    </Text>
                </Pressable>
                <Pressable onPress={()=>navigation.navigate("Register")} style={{marginTop:15}}>
                    <Text style={{textAlign:"center" ,fontSize:16,color:"grey"}}>
                        Don't have an account? Sign Up
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;