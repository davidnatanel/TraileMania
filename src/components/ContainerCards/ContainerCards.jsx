import React from 'react';
import Card from '../Card/Card';
import style from './ContainerCards.module.css';

const ContainerCards = ({ movies }) => {



    return (
        <div className={style.container}>

            {movies ? movies.map((e, i) => {

                return (
                    <Card item={e} key={e.id} id={e.id} title={e.title} poster_path={e.poster_path} />
                )
            }) : ''}

        </div>
    );
};

export default ContainerCards;