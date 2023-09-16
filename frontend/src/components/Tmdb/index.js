
import axios from "axios";
const API_KEY = 'a529c88c4b88bffb7c515f794e2c8ff1';
const API_BASE = 'https://api.themoviedb.org/3';



const Axios = async (endpoint) => {
    try{
        const res=await axios.get(`${API_BASE}${endpoint}`);
        console.log(res.data.results);
        return res.data;
    }
    catch(err){
        console.log(err);
    }
    // .then(res=>{
    //     // const result=res.data.json();
    //     console.log(res.data.results);
    //     return res.data.results;
    // }).catch(err=>console.log(err));
 
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Tv',
                items: await Axios(`/discover/tv?with_network=213&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomended',
                items: await Axios(`/trending/all/week?language=en-US&region=India&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Top Rated',
                items: await Axios(`/movie/top_rated?language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Action',
                items: await Axios(`/discover/movie?with_genres=28&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'comedy',
                items: await Axios(`/discover/movie?with_genres=35&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Horror',
                items: await Axios(`/discover/movie?with_genres=27&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'animated',
                title: 'Animated',
                items: await Axios(`/discover/movie?with_genres=16&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentary',
                items: await Axios(`/discover/movie?with_genres=99&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'sciencefiction',
                title: 'Science Fiction',
                items: await Axios(`/discover/movie?with_genres=878&language=en-US&api_key=${API_KEY}`)
            },
        ];
    },

    getMovierInfo: async (movieId, type) => {
        let info = {};

        if(movieId) {
            switch(type) {
                case 'movie':
                    info = await Axios(`/movie/${movieId}?language=en-US&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await Axios(`/tv/${movieId}?language=en-US&api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break;
            }
        }


        return info;
    }
}