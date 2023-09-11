import React, {useEffect, useState} from 'react';
import {
    Image,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,

    TouchableOpacity,
    View
} from "react-native";
import {AntDesign,  Ionicons, MaterialIcons} from "@expo/vector-icons";
import  {categories,deals,offers} from "../data/productData"
import {SliderBox} from "react-native-image-slider-box";

import axios from "axios";
import ProductItem from "../components/ProductItem";
import {useNavigation} from "@react-navigation/native";

import SearchBar from "../components/SearchBar";

const HomeScreen = () => {
    const [products, setProducts] = useState([])
     const images = [
        "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
        "ahttps://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
    ];

    const navigation = useNavigation()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("jewelery");

    const toggling = () => setIsOpen(!isOpen);

    const options=[
        'men\'s clothing', 'jewelery', 'electronics', 'women\'s clothing'
    ]
    const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
    };


    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await axios.get("https://fakestoreapi.com/products")
                setProducts(response.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])


     return (
        <>
            <SafeAreaView
                style={{
                    paddingTop: Platform.OS === "android" ? 40 : 0,
                    flex: 1,
                    backgroundColor: "white",
                }}
            >
                <ScrollView>
                    <SearchBar/>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        padding: 10,
                        backgroundColor: "#AFEEEE"
                    }}>
                        <Ionicons name={"location-outline"} size={24} color={"black"}/>
                        <Pressable>
                            <Text style={{fontSize: 13, fontWeight: "500"}}>
                                Deliver to Mulund - Mumbai 400082
                            </Text>
                        </Pressable>
                        <MaterialIcons name={"keyboard-arrow-down"}
                                       size={24}
                                       color={"black"}
                        />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            categories.map(
                                (item, index) => (
                                    <Pressable key={index} style={{
                                        margin: 10,
                                        alignItems: "center"
                                    }}>
                                        <Image
                                            style={{
                                                width: 50,
                                                height: 50,
                                                resizeMode: "contain"
                                            }}
                                            source={{
                                                uri: item?.image
                                            }}/>

                                        <Text style={{
                                            textAlign: "center",
                                            fontSize: 12,
                                            fontWeight: "500",
                                            marginTop: 5
                                        }}>
                                            {item?.name}
                                        </Text>
                                    </Pressable>
                                )
                            )
                        }
                    </ScrollView>
                    <ScrollView>
                        <SliderBox images={images}
                                   autoPlay
                                   circleLoop
                                   dotColor={"#13274f"}
                                   inactiveDotColor={"#80A4AE"}
                                   ImageComponentStyle={{width: "100%"}}
                        />

                        <Text style={{
                            padding: 10,
                            fontSize: 18,
                            fontWeight: "bold"
                        }}>
                            Trending Deals Of the week
                        </Text>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center", flexWrap: "wrap"
                        }}>
                            {deals.map((item, index) => (
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate("Info", {
                                            id: item.id,
                                            title: item.title,
                                            price: item?.price,
                                            carouselImages: item.carouselImages,
                                            color: item?.color,
                                            size: item?.size,
                                            oldPrice: item?.oldPrice,
                                            item: item,
                                        })
                                    }

                                    key={index}
                                           style={{
                                               marginVertical: 10,
                                               flexDirection: "row",
                                               alignItems: "center",
                                               justifyContent: "center"
                                           }}
                                >

                                    <Image
                                        style={{
                                            width: 180,
                                            height: 200,
                                            resizeMode: "contain"
                                        }}
                                        source={{uri: item?.image}}/>

                                </Pressable>
                            ))}
                        </View>

                        <Text style={{
                            height: 1,
                            borderColor: "#D0D0D0",
                            borderWidth: 2,
                            marginTop: 15
                        }}/>

                        <Text style={{
                            paddingTop: 10,
                            fontSize: 18,
                            fontWeight: "bold"
                        }}>
                            Today's Deals

                        </Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {offers.map((item, index) => (
                                <Pressable

                                    onPress={()=> navigation.navigate("Info",{
                                        id: item.id,
                                        title: item.title,
                                        price: item?.price,
                                        carouselImages: item.carouselImages,
                                        color: item?.color,
                                        size: item?.size,
                                        oldPrice: item?.oldPrice,
                                        item: item,
                                    })}

                                    style={{
                                        marginVertical: 10, alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                    key={index}
                                >
                                    <Image source={{uri: item?.image}}
                                           style={{
                                               width: 150,
                                               height: 150,
                                               resizeMode: "contain"
                                           }}
                                    />
                                    <View style={{
                                        backgroundColor: "#E31837",
                                        paddingVertical: 5,
                                        width: 130,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 10,
                                        borderRadius: 4
                                    }}>
                                        <Text style={{
                                            textAlign: "center",
                                            color: "white",
                                            fontSize: 13,
                                            fontWeight: "bold"
                                        }}>
                                            Upto
                                            {item?.offer}
                                        </Text>

                                    </View>
                                </Pressable>
                            ))}

                        </ScrollView>

                        <Text style={{
                            height: 1,
                            borderColor: "#D0D0D0",
                            borderWidth: 2,
                            marginTop: 15
                        }}/>


                        <View  style={{
                            marginHorizontal: 10,
                            marginTop: 20,
                            width: 190,
                            marginBottom: 15,


                        }}>
                            <TouchableOpacity style={{
                                borderColor: "rgba(161,154,161,0.26)",
                                borderWidth:2,
                                borderRadius:10,
                                height: 50,
                                justifyContent:"space-around",
                                alignItems:"center",
                                flexDirection:"row",




                            }} onPress={toggling}>
                                <Text>{selectedOption}</Text>
                                {
                                    isOpen ?
                                        (<AntDesign name={"up"} size={18} color={"black"}/>
                                        ) : (
                                            <AntDesign name={"down"} size={18} color={"black"}/>
                                        )
                                }
                                 </TouchableOpacity>
                            {isOpen && (
                                <View
                                    style={{
                                        top:50,
                                        width: 190,
                                        position:"absolute",
                                        zIndex:9999
                                    }}
                                >
                                    {options.map(option => (
                                        <TouchableOpacity key={Math.random()} style={{
                                            backgroundColor: '#DDDDDD',
                                            padding: 10,
                                            flexDirection:"row",
                                            justifyContent:"space-between"

                                        }} onPress={onOptionClicked(option)}>
                                            <Text>{option}</Text>
                                            {
                                                selectedOption === option &&
                                                (

                                                    <AntDesign name={"check"} size={18} color={"black"}/>
                                                )
                                            }
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>



                        <View
                            style={{
                                flexDirection:"row",
                                alignItems:"center",
                                flexWrap:"wrap"
                            }}
                        >

                            {products?.filter((item)=>(
                                item?.category === selectedOption
                            )).map((item,index)=>(
                                <ProductItem item={item} key={index}/>
                            ))}
                        </View>

                    </ScrollView>

                </ScrollView>

            </SafeAreaView>

        </>
    );
};

export default HomeScreen;