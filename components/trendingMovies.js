import { View,Text, TouchableWithoutFeedback, Dimensions , Image } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import MovieCard from "./movieCard";

var {width , height} = Dimensions.get('window');  //to get ht and wt of the current device window to use them in carousel

export default function TrendingMovies({trendingData}){

    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie',item)   //refers to StackScreen name as declared in navigation.js
    }

    return ( 
        <View>

            <Text className = 'text-white text-xl mx-4 mb-5'>TRENDING MOVIES</Text>

            <Carousel
                data={trendingData}
                renderItem = {({item}) => <MovieCard item={item} handleClick={handleClick} />}  
                firstItem = {1}
                inactiveSlideOpacity = {0.60}
                sliderWidth = {width}
                itemWidth = {width*0.62} 
                slideStyle = {{display:'flex',alignItems:'center'}}
                />

            

        </View>
    )
}


