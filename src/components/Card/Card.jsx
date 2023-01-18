import React, { useContext, useEffect, useState } from 'react';
import style from './Card.module.css';
import { AiFillPlaySquare } from "react-icons/ai";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { MovieContext } from '../../Pages/Home/Home';
import { ReloadContext } from '../../Pages/Favorite/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, addMovie, addMovieSelect, removeFavorite } from '../../redux/UserSlice';
import { Link } from 'react-router-dom';
const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"

const Card = ({ title, poster_path, id, item
}) => {
    const context = useContext(MovieContext)


    const [favorite, setFavorite] = useState([])



    const favoriteState = useSelector((state) => state.userSlice.favorite)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("favorite") != null) {
            setFavorite(favoriteState.find(e => e.id == item.id))
        }
    }, [favoriteState])

    const saveLocal = () => {

        dispatch(addFavorite(item))


    }

    const FilterLocal = () => {
        dispatch(removeFavorite(item))
    }

    return (
        <div className={style.container}>

            <p>{title}</p>
            {favorite ?
                <BsBookmarkStarFill onClick={() => FilterLocal()} className={style.save} />

                : <BsBookmarkStar onClick={() => saveLocal()} className={style.save} />}



            <div className={style.containerImg}>

                <img src={`${IMAGE_PATH}${poster_path}`} alt="" />
                <AiFillPlaySquare onClick={() => dispatch(addMovieSelect(id))} className={style.play} />

            </div>


            <Link style={{ width: '100%' }} to={`/detailtraile/${item.id}`}> <button className={style.viewMore} >ver mas</button></Link>
        </div>
    );
};

export default Card;