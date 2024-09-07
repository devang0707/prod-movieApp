import { View,Text, Dimensions, TouchableWithoutFeedback, Image } from "react-native";
import React from "react";
import { img500 } from "../api/moviedb";

var {width , height} = Dimensions.get('window');

export default function MovieCard({item,handleClick}){
    //console.log('itemPosterPath', item.poster_path)
    return ( 
        <TouchableWithoutFeedback onPress={()=>handleClick(item)}>   
            <Image
                //source = {require('../assets/favicon.png')} 
                source={{uri: img500(item.poster_path)}}
                style = {{width: width*0.6 , height: height*0.4}}
                className = 'rounded-3xl'
            />
        </TouchableWithoutFeedback>
    )
}