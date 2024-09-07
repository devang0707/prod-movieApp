import { View,Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { img185 } from "../api/moviedb";


export default function MovieList({title,data,hideSeeAll}){

    var {width,height} = Dimensions.get('window');
    const navigation = useNavigation();
    let movieName = 'Ant man and the wasp : quantumania' ;
    const handleClick = (item) => {
        navigation.push('Movie',item)   //refers to StackScreen name as declared in navigation.js
    }

    return ( 
        <View className = 'mb-8 space-y-4'>

            <View className = 'flex-row items-center justify-between mx-4'>
                <Text className= 'text-white text-xl'>{title}</Text>
                {!hideSeeAll ? 
                    <TouchableOpacity>
                        <Text className = 'text-amber-500 text-lg'>See All</Text>
                    </TouchableOpacity>
                : ''
                }
                
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:15}}>
                {data.map((item,index) => {
                    return (
                        <TouchableWithoutFeedback key={index} onPress={()=>handleClick(item)}>     
                            <View className='space-y-1 mr-4' >
                                <Image source={{uri: img185(item.poster_path) }} style= {{width:width*0.33 , height: height*0.22}} className= 'rounde-3xl'/>
                                <Text className= 'text-neutral-300 ml-1'>
                                    {/*{movieName.length>14 ? movieName.slice(0,14)+'...' : movieName}*/}
                                    {item.title.length>14 ? item.title.slice(0,14)+'...' : item.title}
                                </Text>
                            </View>
                            
                        </TouchableWithoutFeedback>
                    )
                })}
            </ScrollView>
            
        </View>
    )
}