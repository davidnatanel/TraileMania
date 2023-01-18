import React, { useContext, useEffect, useState } from 'react';
import style from './NavBar.module.css'
import { GiPopcorn } from "react-icons/gi";
import { MdFavoriteBorder, MdFavorite, MdManageAccounts } from "react-icons/md";
import axios from 'axios';
import { MovieContext } from '../../Pages/Home/Home';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { APK } from '../../routes/Routes';

const NavBar = () => {
    const context = useContext(MovieContext)
    const [numFavorite, setNumFavorite] = useState(0)
    const favoriteState = useSelector((state) => state.userSlice.favorite)


    const [input, setInput] = useState({
        search: ''
    })
    useEffect(() => {
        if (input.search == '') { context.setSearchMovies([]) }



    }, [input])



    const changeInput = (e) => {

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const fetchMovies = async () => {

        const { data } = await axios.get
            (`https://api.themoviedb.org/3/search/movie`
                , {
                    params: {
                        api_key: APK,
                        append_to_response: "videos",
                        language: "ES",
                        query: input.search.split(' ').join('+')
                    }
                }
            )


        context.setSearchMovies(data.results)



    }
    const search = async () => {

        await fetchMovies()
    }
    return (
        <nav className={style.container}>
            <ul>
                <li><GiPopcorn /></li>
                <li className={style.search}>
                    <input type="text" name='search' value={input.search} onChange={(e) => { changeInput(e) }} />

                    <button onClick={() => search()}>Search</button>


                </li>
                <li></li>
                <li className={style.favorite}> <p>{favoriteState ? favoriteState.length : ""}</p>  <Link to={'/favorite'}>  <MdManageAccounts /></Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;