import React from "react";
import { Link } from "react-router-dom"; //Link para mas detalles

//Estilos y resources
import s from './card.module.css';
import noImage from './resources/noImage.png'


function Card({name, image, platforms, genres, id, isDb}){

    return(
        <div className={s.card}>
            <Link to={isDb ? `/game/db_${id}` : `/game/${id}`} className={s.link}>
            <div className={s.image}>
                {image ? <img src={image} alt='game'/> : <img src={noImage} alt='game'/>}
            </div>
            <div className={s.info}>
                <div className={s.name} >
                    <h4 title='name'>{name}</h4>
                </div>
                <div className={s.platforms}>
                    {platforms.map((platform, idx) => <p key={idx}>{platform}</p>)}
                </div>
                <div className={s.genres}>
                    {genres.map((genre, idx) => <p key={idx}>{genre}</p>)}
                </div>
            </div>
            </Link>
        </div>
    );
};

export default Card;