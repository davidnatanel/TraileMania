import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import ButtonForMovePages from '../../components/ButtonForMovePages/ButtonForMovePages';
import ContainerCards from '../../components/ContainerCards/ContainerCards';
import Loader from '../../components/Loader/Loader';
import NavBar from '../../components/NavBar/NavBar';
import { chargeFavorite } from '../../redux/UserSlice';
import { APK } from '../../routes/Routes';
import style from './Home.module.css'


const opts = {
    height: '400',
    width: '100%',
}

export const MovieContext = React.createContext({})

const Home = () => {

    const selectTraileState = useSelector((state) => state.userSlice.movieSelect)

    const dispatch = useDispatch()
    const [numberSelect, setNumberSelect] = useState(2)
    const [movies, setMovies] = useState([])
    const [select, setSelect] = useState([])
    const [loader, setloader] = useState(false)
    const [searchMovies, setSearchMovies] = useState([])


    const fetchMovies = async () => {
        const { data } = await axios.get


            (`https://api.themoviedb.org/3/discover/movie?page=1&language=ES`,
                {
                    params: {
                        page: numberSelect.toString(),
                        api_key: APK,
                        append_to_response: "videos"
                    }
                }
            )


        setMovies(data.results)

    }



    const fetchMovieSelect = async (id) => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
                api_key: APK,
                append_to_response: "videos"
            }
        })

        let movieSearch = data.videos.results.find((e) => e.name.toLowerCase() == 'official trailer' || e.name.toLowerCase() == 'official teaser [subtitled]' || e.name.toLowerCase() == 'official trailer [subtitled]')
        if (movieSearch) return setSelect(movieSearch)
        setSelect(data.videos.results[0])

    }


    useEffect(() => {
        fetchMovies()
        dispatch(chargeFavorite())
        setTimeout(() => {
            setloader(true)

        }, 1000);
    }, [])


    if (!loader || !movies) return (<Loader />)

    return (
        <MovieContext.Provider value={{ fetchMovieSelect, setSearchMovies }}>
            <NavBar />
            <div className={style.container}>
                <YouTube
                    opts={opts}
                    loading='eager'
                    videoId={selectTraileState?.key ? selectTraileState?.key : '_JzBbU4-5Aw'}
                />

                <ContainerCards movies={searchMovies.length > 0 ? searchMovies : movies} />
                <ButtonForMovePages setNumberSelect={setNumberSelect} fetchMovies={fetchMovies} />
            </div>
        </MovieContext.Provider>
    );
};

export default Home;