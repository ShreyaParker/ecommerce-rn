import React, {useState} from 'react';
import {KeyboardAvoidingView, Pressable, Image, Text, SafeAreaView, TextInput, View, Alert} from "react-native";
import {AntDesign, MaterialIcons,Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";


const RegisterScreen = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [name,setName] = useState("")
    const navigation = useNavigation()

    const handleRegister = () =>{
        const  user = {
            name : name,
            email: email,
            password:password
        }
        axios.post("http://10.0.2.2:5000/register",user).then((response)=>{
            console.log(response)
            Alert.alert("registration succesful")
        }).catch((e) => {
            Alert.alert("Error",e.message)
            console.log(e.message)
        })

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
                         Register Your Account
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
                        <Ionicons
                            name="ios-person"
                            size={24}
                            color="gray"
                            style={{ marginLeft: 8 }}
                        />
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: name ? 16 : 16,
                            }}
                            placeholder="enter your name"
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30,
                        }}
                    >
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
                            name="email"
                            size={24}
                            color="gray"
                        />

                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: password ? 16 : 16,
                            }}
                            placeholder="enter your Email"
                        />
                    </View>
                </View>

                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30,
                        }}
                    >
                        <AntDesign
                            name="lock1"
                            size={24}
                            color="gray"
                            style={{ marginLeft: 8 }}
                        />

                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 16 : 16,
                            }}
                            placeholder="enter your Password"
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
                    onPress={handleRegister}
                    style={{width:200, backgroundColor:"#FEBE10" ,borderRadius:6,marginLeft:"auto",marginRight:"auto",padding:15}}>
                    <Text style={{textAlign:"center" , color:"white",fontSize:16,fontWeight:"bold"}}>
                        Register
                    </Text>
                </Pressable>
                <Pressable
                    onPress={()=>navigation.navigate("Login")} style={{marginTop:15}}>
                    <Text style={{textAlign:"center" ,fontSize:16,color:"grey"}}>
                        Already have an account? Sign In
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
};

export default RegisterScreen;