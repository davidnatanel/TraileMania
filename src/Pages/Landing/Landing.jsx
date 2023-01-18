import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css'
import { GiPopcorn } from "react-icons/gi";

const Landing = () => {
    return (
        <div className={style.container}>
            <nav >
                <ul>

                    <li><GiPopcorn /></li>

                </ul>
            </nav>


            <div className={style.containerButton}>

                <Link to={'/home'}> <button>Movies</button></Link>


            </div>

        </div>
    );
};

export default Landing;