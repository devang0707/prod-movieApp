import { View,Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import { fetchMovieCredits, fetchMovieDetails, fetchSimiliarMovies, img500 } from "../api/moviedb";



var {width , height} = Dimensions.get('window');
const ios = Platform.OS == 'ios' ;
const topMargin = ios ? '' : 'mt-3';

//to give params a alias as 'item'
export default function MovieScreen(){

    const {params : item} = useRoute();    
    const navigation = useNavigation();

    let movieName = 'Ant man and the wasp : quantumania' ;

    const [isFavourite, SetIsFavourite] = useState(false);
    const [cast,setCast] = useState([]);
    const [similiarMoviesData, SetSimiliarMoviesData] = useState([]);

    const [loading , SetLoading] = useState(false);

    const [movie, setMovie] = useState({});

    useEffect(()=>{
        //console.log('item id :' , item.id);
        SetLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimiliarMovies(item.id);
    },[item])

    const getMovieDetails = async(id) => {
        const data = await fetchMovieDetails(id);
        //console.log('details : ' , data);
        if (data) setMovie(data);
        SetLoading(false)
    }

    const getMovieCredits = async(id) => {
        const data = await fetchMovieCredits(id);
        if (data && data.cast) setCast(data.cast);
    }

    const getSimiliarMovies = async(id) => {
        const data = await fetchSimiliarMovies(id);
        //console.log('similiar mov: ' , data)
        if(data && data.results) SetSimiliarMoviesData(data.results);

    }

    return ( 
        <ScrollView contentContainerStyle={{paddingBottom:20}} className='flex-1 bg-neutral-900'>
            
            <View className= 'w-full  '>

                <SafeAreaView className={'absolute z-20 w-full px-4 flex-row items-center justify-between '+ topMargin}  >
                    <TouchableOpacity onPress={() => navigation.goBack()} className='bg-amber-500 rounded-xl p-1'>
                        <ChevronLeftIcon size='28' strokeWidth={2.5} color= 'white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> SetIsFavourite(!isFavourite)}>
                        <HeartIcon size = '35' color = {isFavourite ? 'orange' : 'white'}/>
                    </TouchableOpacity>
                </SafeAreaView>

                <View>
                    <Image source={{uri: img500(movie?.poster_path)}} style = {{width, height: height*0.55}} />
                    <LinearGradient
                        colors = {['transparent', 'rgba(23,23,23,0.8)','rgba(23,23,23,1)']}
                        style = {{width, height: height*0.40}}
                        start = {{x:0.5,y:0}}
                        end = {{x:0.5,y:1}}
                        className = 'absolute bottom-0'
                        />
                </View>
                
            </View>
            
            {/* MovieDetails */}
            <View style={{marginTop: -(height*0.09)}} className='space-y-3'>
                <Text className='text-white text-center text-3xl font-bold tracking-wider'>{movie.title}</Text>
                {
                    movie?.id?(
                        <Text className='text-neutral-400 font-semibold text-base text-center'>{movie?.status} | {movie?.release_date?.split('-')[0]} | {movie?.runtime} </Text>
                    ) : null
                }
                

                <View className='flex-row justify-center mx-4 space-x-2'>
                    {
                        movie?.genres?.map((genre,index) => {
                            let showLine = index+1 != movie.genres.length;
                            return(
                                <Text key={index} className='text-neutral-400 font-semibold text-base text-center'>{genre?.name} {showLine ? '|' : null}</Text>
                            )                           
                        })
                    }
                    {/* <Text className='text-neutral-400 font-semibold text-base text-center'>Action |</Text>
                    <Text className='text-neutral-400 font-semibold text-base text-center'>Thrill |</Text>
                    <Text className='text-neutral-400 font-semibold text-base text-center'>Comedy</Text> */}
                </View>

                <Text className='text-neutral-400 mx-4 tracking-wide'>{movie?.overview}</Text>

            </View>

            {cast.length > 0 && <Cast navigation={navigation} cast = {cast} />}

            {similiarMoviesData.length > 0 && <MovieList hideSeeAll = {true} title= 'Similiar Movies' data = {similiarMoviesData} />}

        </ScrollView>
    )
}

