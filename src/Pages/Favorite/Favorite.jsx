
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import ContainerCards from '../../components/ContainerCards/ContainerCards';
import Loader from '../../components/Loader/Loader';
import { chargeFavorite } from '../../redux/UserSlice';
import style from './Favorite.module.css';

const opts = {
    height: '600',
    width: '100%',
}



const Favorite = () => {


    const favoriteState = useSelector((state) => state.userSlice.favorite)
    const selectTraileState = useSelector((state) => state.userSlice.movieSelect)
    const dispatch = useDispatch()

    useEffect(() => {

        if (favoriteState.length == 0) {
            dispatch(chargeFavorite())

        }

    }, [])

    if (!favoriteState) return (<Loader />)














    return (


        <div className={style.container}>


            <div className={style.nav}>

                <Link to={'/home'}> <button>to Home</button></Link>

            </div>
            {favoriteState?.length > 0 ? <div className={style.video}>
                <YouTube
                    opts={opts}
                    loading='eager'
                    videoId={selectTraileState?.key ? selectTraileState?.key : '_JzBbU4-5Aw'}
                />
            </div> : ''}
            {favoriteState?.length > 0 ? <ContainerCards movies={favoriteState} /> : <div className={style.notFavorite}>No hay favoritos</div>}

        </div>


    );
};

export default Favorite;