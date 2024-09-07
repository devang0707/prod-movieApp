import axios from "axios";
import { apiKey } from "../constants";

//endpoints
const apiBaseURL = 'https://api.themoviedb.org/3'
//const trendingEndpoint = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US ? api_key=320658b574653fe4e6843520692246c0'  // ? and & makes difference
const trendingEndpoint = `${apiBaseURL}/trending/movie/day?language=en-US&api_key=${apiKey}`
const upcomingEndpoint = `${apiBaseURL}/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`
const topRatedEndpoint = `${apiBaseURL}/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`


//dynamic endpoints
const movieDetailsEndpoint = (id) => (`${apiBaseURL}/movie/${id}?language=en-US&api_key=${apiKey}`)
const movieCreditsEndpoint = (id) => (`${apiBaseURL}/movie/${id}/credits?language=en-US&api_key=${apiKey}`)
const movieSimiliarEndpoint = (id) => (`${apiBaseURL}/movie/${id}/similar?language=en-US&page=1&api_key=${apiKey}`)

const searchMoviesEndpoint = (id) => `${apiBaseURL}/search/movie?query=${id}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`

const personDetailsEndpoint = (id) => (`${apiBaseURL}/person/${id}?language=en-US&api_key=${apiKey}`)
const personMoviesEndpoint = (id) => (`${apiBaseURL}/person/${id}/movie_credits?language=en-US&api_key=${apiKey}`)


//func to fetch pics of width 500 
export const img500 = (path) => (path ? `https://image.tmdb.org/t/p/w500/${path}` : null) ;
export const img342 = (path) => (path ? `https://image.tmdb.org/t/p/w342/${path}` : null) ;
export const img185 = (path) => (path ? `https://image.tmdb.org/t/p/w185/${path}` : null) ;






//api call method to fetch the data from above endpoints
const apiCall = async(endpoint, params) =>{
    const options = {
        method: 'GET',
        url: endpoint,
        params:params ? params : {}
    }

    try{
        const response = await axios.request(options);
        return response.data;
    }
    catch(err){
        console.log('error:' , err)
        return {}
    }
    
}

//func for api call method to fetch trending endpoint
export const fetchTrendingMovies = () => {
    return apiCall(trendingEndpoint)
}
//func for api call method to fetch upcoming endpoint
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingEndpoint)
}
//func for api call method to fetch top-rated endpoint
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedEndpoint)
}



//
export const fetchMovieDetails = (id) => (
    apiCall(movieDetailsEndpoint(id))
)
export const fetchMovieCredits = (id) => (
    apiCall(movieCreditsEndpoint(id))
)
export const fetchSimiliarMovies = (id) => (
    apiCall(movieSimiliarEndpoint(id))
)


export const fetchPersonDetails = (id) => {
    return apiCall(personDetailsEndpoint(id))
}
export const fetchPersonMovies = (id) => {
    return apiCall(personMoviesEndpoint(id))
}


export const searchMovies = (id) => {
    return apiCall(searchMoviesEndpoint(id));
}