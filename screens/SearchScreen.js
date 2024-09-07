import { View,Text, ScrollView, TextInput, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { img185, searchMovies } from "../api/moviedb";
import {debounce} from 'lodash';

const {width,height} = Dimensions.get('window');

export default function SearchScreen(){

    let movieName = 'Ant man and the wasp : quantumania' ;
    const navigation = useNavigation();
    const [results,SetResults] = useState([]);

    const [loading , SetLoading] = useState(false);

    const handleSearch = async(value) => {
        if (value && value.length > 2){
            SetLoading(true);
            const data = await searchMovies(value);
            console.log('got movies ',data);
            if (data && data.results) SetResults(data.results);
            SetLoading(false);
        }
        else{
            SetLoading(false);
            SetResults([])
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch,400),[])

    return ( 
        <SafeAreaView className='bg-neutral-800 flex-1'>

            <View className='mx-4 my-10 flex-row justify-between items-center border border-neutral-500 rounded-full'>
                <TextInput onChangeText={handleTextDebounce} placeholder="Search Movie" placeholderTextColor={'lightgray'} className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'/>
                <TouchableOpacity onPress={()=>navigation.navigate('Home')} className='rounded-full p-3 m-1 bg-neutral-500'><XMarkIcon size='25' color='white'/></TouchableOpacity>
            </View>


            {/* Results */}
            {
                loading ? (
                    <Loading/>
                ) : (
                    results.length > 0 ? (
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:15}} className='space-y-3'>
                        <Text className = 'text-white font-semibold ml-1'>Results ({results.length})</Text>
                        <View className='flex-row justify-between flex-wrap'>
                            { 
                                results.map((item,index)=>{
                                    return(
                                        <TouchableWithoutFeedback onPress={()=>navigation.push('Movie',item)} key={index}>
                                            <View className = 'space-y-2 mb-4'>
                                                <Image className='rounded-3xl' source={{uri:img185(item?.poster_path)}} /*source={require('../assets/favicon.png')}*/ style={{width:width*0.44, height:height*0.3}}/>
                                                <Text className = 'text-neutral-300 ml-1'>{item.title.length > 22 ? item.title.slice(0,22)+'...' : item.title}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })
                            }
                        </View>
        
                    </ScrollView>
                    ) : (
                        <View className= 'mx-auto'>
                            <Text className = 'text-white'>No Relevant Results Found</Text>
                        </View>
                    )
                )
            }

        </SafeAreaView>
    )
}