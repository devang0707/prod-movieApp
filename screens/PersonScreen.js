import { View,Text, ScrollView, Dimensions, Platform , TouchableOpacity, Image} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Progress from 'react-native-progress';
import { fetchPersonDetails, fetchPersonMovies, img342 } from "../api/moviedb";
import MovieList from "../components/movieList";


var {width , height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : 'my-3';


export default function PersonScreen(){

    //
    const {params:item} = useRoute();

    const navigation = useNavigation();
    const [favourite,SetFavourite] = useState(false);
    const [personMovies, SetPersonMovies] = useState([])
    const [loading , SetLoading] = useState(false);

    const [personData,setPersonData] = useState({});

    useEffect(()=>{
        SetLoading(true);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    },[item])

    const getPersonDetails = async(id) =>{
        const data = await fetchPersonDetails(id);
        //console.log('got person details ' , data)
        if (data) setPersonData(data)
        SetLoading(false);
    }
    const getPersonMovies = async(id) =>{
        const data = await fetchPersonMovies(id);
        //console.log('got person movies' , data)
        if (data && data.cast) SetPersonMovies(data.cast)
        SetLoading(false);
    }

    return ( 
        <ScrollView contentContainerStyle={{paddingBottom:20}} className='flex-1 bg-neutral-900'>
            
            
                <SafeAreaView className={'z-20 w-full px-4 flex-row items-center justify-between '+ verticalMargin}  >
                    <TouchableOpacity onPress={() => navigation.goBack()} className='bg-amber-500 rounded-xl p-1'>
                        <ChevronLeftIcon size='28' strokeWidth={2.5} color= 'white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> SetFavourite(!favourite)}>
                        <HeartIcon size = '35' color = {favourite ? 'red' : 'white'}/>
                    </TouchableOpacity>
                </SafeAreaView>

                
                {
                    loading ? (
                        <View style = {{height,width}} className = 'relative -top-[70px]  justify-center items-center'>
                                <Progress.CircleSnail thickness={12} size={160} color = 'orange' />
                        </View>
                    ) : (
                        <View>

                        <View className='flex-row justify-center '>
                            <View className = 'items-center rounded-full overflow-hidden border-2 border-neutral-500 shadow-2xl shadow-amber-500'>
                                <Image className='' source = {{uri: img342(personData?.profile_path) }} /*source={require('../assets/favicon.png')}*/ style={{height: height*0.43, width: width*0.74}} />
                            </View>
                        </View>

                        <View className='mt-6'>
                                <Text className = 'text-3xl text-white font-bold text-center'>{personData?.name}</Text>
                                <Text className = 'text-base text-neutral-500 text-center'>{personData?.place_of_birth}</Text>
                        </View>
        
                        <View className='mx-3 p-3 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full'>
                                <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                    <Text className='text-white font-semibold'>Gender</Text>
                                    <Text className='text-neutral-300 text-sm'>{personData?.gender == 1 ? 'Female' : 'Male'}</Text>
                                </View>
                                <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                    <Text className='text-white font-semibold'>Birthday</Text>
                                    <Text className='text-neutral-300 text-sm'>{personData?.birthday}</Text>
                                </View>
                                <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                    <Text className='text-white font-semibold'>Known for</Text>
                                    <Text className='text-neutral-300 text-sm'>{personData?.known_for_department}</Text>
                                </View>
                                <View className='px-2 items-center'>
                                    <Text className='text-white font-semibold'>Popularity</Text>
                                    <Text className='text-neutral-300 text-sm'>{personData?.popularity?.toFixed(2)} %</Text>
                                </View>
                        </View>
        
                        <View className='my-6 mx-4 space-y-2'>
                                <Text className='text-white text-lg'>Biography</Text>
                                <Text className = 'text-neutral-400 tracking-wide'>{personData?.biography}</Text>
                        </View>
        
                        <MovieList title = {'Movies'} data={personMovies} hideSeeAll = {true} />

    
                </View>                        
                    )
                }
            
        </ScrollView>
    )
}