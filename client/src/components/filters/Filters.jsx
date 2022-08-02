//react y estilos
import React from 'react';
import s from './filters.module.css';

//redux
import {useDispatch, useSelector} from 'react-redux';

//actions
import { setAllGames } from '../../redux/actions';
import { filterByGenres, filterByPlatforms, filterByDb, sortByRating, sortByName } from '../functions';

function Filters() {
    const platforms = useSelector(store => store.platforms);
    const genres  = useSelector(store => store.genres);
    const allGames = useSelector(store => store.allGames);
    const dispatch = useDispatch();

    if(typeof genres === 'string' || typeof platforms === 'string'){
        return (<div className={s.error}>Error loading the filters! Reload</div>);
    }else{
        return (<div className={s.container}>
            <div className={s.filters}>
                <h3>Filters</h3>

                {/* Filtrar por genres */}
                <div className={s.genres}>
                    <label>Genres</label>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        let genre = e.target[0].value;
                        filterByGenres(dispatch, allGames, genre);
                    }} className={s.form}>
                        <select name='Genres' defaultValue={'none'} >
                            <option value='none' >All</option>
                            {genres.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
                        </select>
                        <input type="submit" value={'Apply'} className={s.submit}/>
                    </form>
                </div>

                {/*Filtrar por platforms*/}
                <div className={s.platforms}>
                    <label>Platforms</label>
                    <form onSubmit={(e)=>{
                            e.preventDefault();
                            let genre = e.target[0].value;
                            filterByPlatforms(dispatch, allGames, genre);
                        }} className={s.form}>
                        <select name='Platforms' defaultValue={'none'} >
                            <option value='none' >All</option>
                            {platforms.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                        <input type="submit" value={'Apply'} className={s.submit}/>
                    </form>
                </div>

                {/*Filtrar por storage */}
                <div className={s.database}>
                    <label>Storage</label>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        let mode = e.target[0].value;
                        filterByDb(dispatch, allGames, mode);
                    }} className={s.form}>
                        <select name='Database' defaultValue={'all'} >
                            <option value='all' >All</option>
                            <option value='Database'>Database</option>
                            <option value='API'>API</option>
                        </select>
                        <input type="submit" value={'Apply'} className={s.submit}/>
                    </form>
                </div>
            </div>

            {/*Ordenamientos*/}
            <div className={s.filters}>
                <h3>Sorting</h3>

                <label>By name</label>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    let mode = e.target[0].value;
                    sortByName(dispatch, allGames, mode);
                }} className={s.form}>
                    <select name='sortName' defaultValue={'Any'}>
                        <option value='Any' >Any</option>
                        <option value='A-Z'>A-Z</option>
                        <option value='Z-A'>Z-A</option>
                    </select>
                    <input type="submit" value={'Apply'} className={s.submit}/>
                </form>

                <label>By rating</label>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    let mode = e.target[0].value;
                    sortByRating(dispatch, allGames, mode);
                }} className={s.form}>
                    <select name='sortRating' defaultValue={'Any'}>
                        <option value='Any' >Any</option>
                        <option value='best'>Best</option>
                        <option value='worst'>Worst</option>
                    </select>
                    <input type="submit" value={'Apply'} className={s.submit}/>
                </form>
            </div>

            <div className={s.reload} onClick={()=> dispatch(setAllGames())}>Clear filters</div>
        </div>)
    }
}

export default Filters;