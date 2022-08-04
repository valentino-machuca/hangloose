import React, { useState } from "react";
import { useEffect } from "react";

//Estilos y resources
import Card from '../cards/Card';
import s from './pagination.module.css';

export default function Pagination({games}){

    //paginado
    const ITEMS_PER_PAGE = 15; //items por pagina
    const [itemsPage, setItemsPage] = useState([]); //Items que se van a mostrar en la pagina actual
    const [currentPage, setCurrentPage] = useState(0); //Pagina actual

    useEffect(() => {
        if(games.response){ //Error si no puede traer juegos
            return;
        }else{
            setCurrentPage(0);
            setItemsPage([...games].splice(0, ITEMS_PER_PAGE)); //Setea los juegos de la primer pagina
        }
    }, [games]);

    const nextHandler = () =>{
        const total = games.length;
        const nextPage = currentPage + 1;
        const initialIndex = nextPage * ITEMS_PER_PAGE; //Proxima posicion donde comienza a traer juegos

        if(initialIndex >= total) return; //Significa que estoy en mi ultima pagina y no deberia continuar a paginas que no existen.

        setItemsPage([...games].splice(initialIndex, ITEMS_PER_PAGE));
        setCurrentPage(nextPage);

    };

    const prevHandler = () => {
        const prevPage = currentPage - 1;

        if(prevPage < 0) return; //Significa que estoy en mi primer pagina y no deberia retroceder más
        const initialIndex = prevPage * ITEMS_PER_PAGE;

        setItemsPage([...games].splice(initialIndex, ITEMS_PER_PAGE));
        setCurrentPage(prevPage);
    }


    //Modulo que renderiza cada card.
    const DisplayGame = ({game}) => {
        return (
            <Card key={game.id} name={game.name} image={game.bg_img} id={game.id} platforms={game.platforms.slice(0,3)} genres={game.genres.slice(0,3)} isDb={game.isDb}/>
        );
    }

    //render
    return(
        <div className={s.pagination}>
                <div className={s.controllers}>
                    <div className={s.prev} onClick={() => prevHandler()}>
                        <div>Prev</div>
                    </div>
                    <span className={s.currentPage}>{currentPage+1}</span>
                    <div className={s.next} onClick={() => nextHandler()}>
                    <div>next</div>
                    </div>
                </div>

            <div className={s.gamesContainer}>
                {games.response ?  (<div className={s.error}>{'Something went wrong :(, please try again.'}</div>) : (itemsPage.length ?  itemsPage.map((game) => {//Si no existen juegos o error, retorna mensaje.
                    return <DisplayGame game={game} key={game.id}/>
                }) : <h3>{'Hmm... There is nothing here, try something else'}</h3>)}
            </div>
        </div>
    );
};
