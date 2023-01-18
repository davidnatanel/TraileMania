import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { APK } from '../../routes/Routes';
import style from './DetailCard.module.css';
const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"

const DetailCard = () => {
    const [traile, setTraile] = useState({})
    let { id } = useParams()
    const fetchMovieSelect = async (id) => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
                api_key: APK,
                append_to_response: "videos",
                language: "ES"
            }
        })
        console.log(data)

        setTraile(data)


    }
    useEffect(() => {
        fetchMovieSelect(id)
    }, [])

    if (!traile.overview || !traile.poster_path) return (<Loader />)


    return (

        <div className={style.container}>

            <div className={style.containerTraile} >
                <div className={style.image} >
                    <p>{traile.title}</p>
                    <img src={`${IMAGE_PATH}${traile.poster_path}`} alt="" />

                </div>
                <div className={style.info}>
                    <p className={style.overview} >{traile.overview}</p>
                    <p className={style.release_date}>{traile.release_date}</p>
                    <div className={style.languagecss}>
                        {traile?.spoken_languages?.length > 0 ? traile.spoken_languages.map((e, i) => (<div key={i}>{e.english_name}</div>)) : ""}

                    </div>
                    <div className={style.genrescss}>
                        {traile?.genres?.length > 0 ? traile.genres.map((e, i) => (<div key={i}>{e.name}</div>)) : ""}

                    </div>

                    <div className={style.homeButton}> <Link to={'/home'}> <button>to Home</button></Link></div>


                </div>
            </div>

        </div>



    );
};

export default DetailCard;