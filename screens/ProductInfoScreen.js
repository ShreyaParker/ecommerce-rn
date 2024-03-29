import React, {useState} from 'react';
import {Dimensions, ImageBackground, Pressable, ScrollView, Text, View} from "react-native";
import SearchBar from "../components/SearchBar";
import {useRoute} from "@react-navigation/native";
import {AntDesign, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../redux/CartReducer";

const ProductInfoScreen = () => {
    const[addedToCart,setAddedToCart] = useState(false)
    const route = useRoute()
    const { width } = Dimensions.get("window")
    const height = (width * 100) / 100;
    const dispatch = useDispatch()
    const cart = useSelector((state)=> state.cart.cart)
    const handleAddItem = (item) =>{
        setAddedToCart(true)
        dispatch(addToCart(item))
        setTimeout(()=>{
            setAddedToCart(false)
        },60000)

    }

    console.log(cart)
    return (
       <ScrollView
           style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}
           showsVerticalScrollIndicator={false}

       >
           <SearchBar/>
           <ScrollView
               horizontal showsVerticalScrollIndicator={false}
           >
               {route?.params?.carouselImages?.map((item,index)=>(
                   <ImageBackground key={index}
                                    style={{
                                        width,height,
                                        marginTop:25,
                                        resizeMode:"contain"
                                    }}
                                    source={{
                                        uri:item
                                    }}

                   >
                       <View
                           style={{
                               padding:20,
                               flexDirection:"row",
                               alignItems:"center",
                               justifyContent:"space-between"
                           }}
                       >
                           <View
                               style={{
                                   width:40,
                                   height:40,
                                   borderRadius:20,
                                   backgroundColor:"#C60C30",
                                   justifyContent:"center",
                                   alignItems:"center",
                                   flexDirection:"row"
                               }}
                           >
                               <Text style={{
                                  color:"white",
                                   textAlign:"center",
                                   fontWeight:"600",
                                   fontSize:12
                               }}>
                                   20% off
                               </Text>

                           </View>
                           <View
                               style={{
                                   width:40,
                                   height:40,
                                   borderRadius:20,
                                   backgroundColor:"#E0E0E0",
                                   justifyContent:"center",
                                   alignItems:"center",
                                   flexDirection:"row"
                               }}
                           >
                               <MaterialCommunityIcons name={"share-variant"} size={24} color={"black"}/>

                           </View>

                       </View>

                       <View
                           style={{
                               width:40,
                               height:40,
                               borderRadius:20,
                               backgroundColor:"#E0E0E0",
                               justifyContent:"center",
                               alignItems:"center",
                               flexDirection:"row",
                               marginTop:"auto",
                               marginLeft:10,
                               marginBottom:20
                           }}
                       >
                           <AntDesign name={"hearto"} size={24} color={"black"}/>

                       </View>
                   </ImageBackground>

                   ))}
           </ScrollView>

           <View style={{
               padding:10,
           }}>
               <Text style={{
                   fontSize:15,
                   fontWeight:"500"
               }}>
                   {route?.params?.title}

               </Text>
               <Text style={{
                   fontSize: 18,
                   marginTop:6,
                   fontWeight: "600"

               }}>
                   ₹ {route?.params?.price}
               </Text>





           </View>
           <Text style={{
               height:1,
               borderColor:"#D0D0D0",
               borderWidth:1
           }}/>

           <View style={{
               flexDirection:"row",
               alignItems:"center",
               padding:10
           }}>
               <Text>
                   Color :
               </Text>
               <Text style={{
                   fontSize:15,
                   fontWeight:"bold"
               }}>
                   {route?.params?.color}

               </Text>

           </View>
           <View style={{
               flexDirection:"row",
               alignItems:"center",
               padding:10
           }}>
               <Text>
                   Size :
               </Text>
               <Text style={{
                   fontSize:15,
                   fontWeight:"bold"
               }}>
                   {route?.params?.size}

               </Text>

           </View>
           <Text style={{
               height:1,
               borderColor:"#D0D0D0"
               ,
               borderWidth:1
           }}/>
               <View style={
                   {
                       padding:10
                   }
               }>
                   <Text
                       style={{
                           fontSize:15,
                           fontWeight:"bold",
                           marginVertical:5
                       }}
                   >
                       Total: ₹ {
                        route?.params?.price
                   }
                   </Text>
                   <Text
                       style={{
                           color:"#00CED1"
                       }}
                   >
                       FREE delivery Tomorrow
                   </Text>
                <View style={{
                    flexDirection:"row",
                    marginVertical:5,
                    alignItems:"centr",
                    gap:5,
                }}>
                    <Ionicons name={"location"} size={24} color={"black"}/>
                    <Text style={{fontSize: 15, fontWeight: "500"}}>
                        Deliver to Mulund - Mumbai 400082
                    </Text>

                </View>


               </View>
           <Text style={{
               color:"green",
               marginHorizontal:10,
               fontWeight:"500"
           }}>
               In Stock

           </Text>

           <Pressable
               onPress={()=> handleAddItem(route?.params?.item)}
               style={{
                   backgroundColor:"#FFC72C",
                   padding:10,
                   borderRadius:20,
                   justifyContent:"center",
                   alignItems:"center",
                   marginHorizontal:10,
                   marginVertical:10
               }}
           >
               {
                   addedToCart ? (
                       <Text>
                           Added to Cart
                       </Text>
                   ) : (
                       <Text>
                           Add to Cart
                       </Text>
                   )
               }
           </Pressable>
           <Pressable style={{
               backgroundColor:"#FFAC1C",
               padding:10,
               borderRadius:20,
               justifyContent:"center",
               alignItems:"center",
               marginHorizontal:10,
               marginVertical:10
           }}>
               <Text>
                   Buy Now
               </Text>
           </Pressable>

       </ScrollView>
    );
};

export default ProductInfoScreen;