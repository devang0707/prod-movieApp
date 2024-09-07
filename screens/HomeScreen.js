import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react'
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchTrendingMovies, fetchUpcomingMovies, fetchTopRatedMovies } from '../api/moviedb';


const ios = Platform.OS == 'ios';

export default function HomeScreen(){

    const [trendingData , SetTrendingData] = useState([]);
    const [upcomingData , SetUpcomingData] = useState([]);
    const [topRatedData , SetTopRatedData] = useState([]);

    const [loading , SetLoading] = useState(true);
 
    const navigation = useNavigation();


    useEffect(()=>{
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    },[])

    const getTrendingMovies = async() =>{
        const data = await fetchTrendingMovies();
        //console.log('trending movies data :' , data);
        if(data && data.results) SetTrendingData(data.results);
        SetLoading(false);
    }
    const getUpcomingMovies = async() =>{
        const data = await fetchUpcomingMovies();
        //console.log('upcoming movies data :' , data);
        if(data && data.results) SetUpcomingData(data.results);
        SetLoading(false);
    }
    const getTopRatedMovies = async() =>{
        const data = await fetchTopRatedMovies();
        //console.log('top-rated movies data :' , data);
        if(data && data.results) SetTopRatedData(data.results);
        SetLoading(false);
    }


    return(
    <View className = 'flex-1 bg-neutral-800'>   

        {/* Navbar not inside ScrollView so fixed and not scrolling down */}
        <SafeAreaView className = {ios ? '-mb-2' : 'mb-3'}>

            <StatusBar style = 'light'/>

            <View className = 'flex-row items-center justify-between mx-4'>
                <Bars3CenterLeftIcon size = '30' strokeWidth={3} color = 'white' />
                <Text className = 'text-white text-3xl font-bold'><Text className = 'text-amber-500'>M</Text>ovies</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Search')}><MagnifyingGlassIcon size='30' strokeWidth = {2} color = 'white' /></TouchableOpacity>
            </View>

        </SafeAreaView>

        {
            loading ? (
                <Loading/>
            ) : (
            <ScrollView showsVerticalScrollIndicator = {false} contentContainerStyle = {{paddingbutton: 10}}>

                {trendingData.length> 0 && <TrendingMovies trendingData={trendingData} />}
                <MovieList title = 'Upcoming' data = {upcomingData} />
                <MovieList title = 'Top-Rated' data = {topRatedData} />
    
            </ScrollView>               
            )
        }


    </View>     
    )
}
