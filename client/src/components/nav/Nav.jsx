import React, {useState} from "react"; //Estados interos
import { Link } from "react-router-dom"; //Links

//Redux dispatch
import { useDispatch, useSelector } from 'react-redux';

//Estilos y resources
import s from "./nav.module.css";
import logo from "./resources/hangLoose.png"
import { filterBySearch } from "../functions";

function Nav(){
    const allGames = useSelector(store => store.allGames);
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    return(
        <div className={s.navbar}>
            <div className={s.shadow_logo}></div>

            <div className={s.logo}>
                <img src={logo} alt="logo"/>
            </div>

            <form className={s.search} onSubmit={e => {
                e.preventDefault();
                filterBySearch(dispatch, allGames, input);
                setInput('');
            }}>
                <input type="text" className={s.searchbar} placeholder='Search games...' value={input} onChange={e => setInput(e.target.value)}/>
            </form>

            <div className={s.menu}>
                <div className={s.item_menu}>
                    <Link to="/home" className={s.link}>
                        <p>Home</p>
                    </Link>
                </div>
                <div className={s.item_menu}>
                    <Link to="/create"  className={s.link}>
                        <p>Create</p>
                    </Link>
                </div>
                <div className={s.item_menu}>
                    <Link to="/about"  className={s.link}>
                        <p>About</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Nav;