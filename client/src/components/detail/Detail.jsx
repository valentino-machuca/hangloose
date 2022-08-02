import React, {useEffect} from "react"; //React y useEffect para ciclos de vida
import { useParams } from "react-router-dom"; //Para id

//Nav
import Nav from '../nav/Nav';

//redux
import { getGameById } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

//componentes
import Loader from "../loader/Loader";

//estilos y resources
import s from './detail.module.css';
import Rating from './resources/Rating.png';
import noImage from './resources/noImage.png';

export default function Detail(){

    const id = useParams().id;
    const loading = useSelector(store => store.loading);
    const game = useSelector(store => store.game);
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(getGameById(id));
       // eslint-disable-next-line
    }, []);

    return(
        <>
        <Nav />
        <div className={s.container}>
            {
                loading ? <Loader/> : (game.name === 'AxiosError' ? <div className={s.error}>{'Something went wrong :( , try again.'}</div> :
                (<div className={s.game_detail}>
                    <div className={s.cover}>
                        {game.cover ? <img src={game.cover} alt="cover" /> : <img src={noImage} alt="cover" />}
                    </div>

                    <div className={s.data}>
                        <div className={s.name}>
                            <h3>{game.name}</h3>
                            <span>{game.publisher}</span>
                        </div>
                        <div className={s.info}>
                            <div className={s.platforms}>
                                {game.platforms ? game.platforms.slice(0,4).map(p => <p>{p}</p>) : ''}
                            </div>
                            <div className={s.genres}>
                                {game.genres ? game.genres.slice(0,4).map(g => <p>{g}</p>) : ''}
                            </div>
                        </div>

                        <div className={s.description}>
                            {game.description}
                        </div>

                        <div className={s.lastInfo}>
                            <div className={s.rating}>
                                <img src={Rating} alt="star" />
                                <h3>{game.rating}</h3>
                            </div>
                            <div className={s.release}>
                                {game.release ? <p>Released: {game.release}</p> : <p>Soon...</p>}
                            </div>
                        </div>
                    </div>
                </div>))
            }
        </div>
        </>
    );
}