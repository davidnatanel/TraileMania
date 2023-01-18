import React from 'react';
import style from './Loader.module.css';
import preloader from '../../assets/Preloaders.gif'

const Loader = () => {
    return (
        <div className={style.container}>
            <img src={preloader} alt="" />
        </div>
    );
};

export default Loader;