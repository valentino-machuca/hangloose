import axios from "axios";

//action types
export const CREATE_STATUS = 'CREATE_STATUS';
export const GET_DATA = 'GET_DATA';
export const RECIEVE_GAMES = 'RECIEVE_GAMES';
export const RECIEVE_A_GAME = 'RECIEVE_A_GAME';
export const GET_GAMES = 'CALL_GAMES';
export const FILTER_GAMES = 'FILTER_GAMES';
export const RECIEVE_PLATFORMS = 'RECIEVE_PLATFORMS';
export const RECIEVE_GENRES = 'RECIEVE_GENRES';
export const SET_ALL_GAMES = 'SET_ALL_GAMES';

//actions creators:

export function getData(){
    return{
        type: GET_DATA
    }
}

export function setAllGames(){
    return{
        type: SET_ALL_GAMES
    }
}

export function recieveGames(payload){
    return {
        type: RECIEVE_GAMES,
        payload,
    }
}

export function recieveAGame(payload){
    return {
        type: RECIEVE_A_GAME,
        payload,
    }
}

export function filterGames(payload){
    return{
        type: FILTER_GAMES,
        payload,
    }
}

export function recievePlatforms(payload){
    return{
        type: RECIEVE_PLATFORMS,
        payload,
    }
}

export function recieveGenres(payload){
    return{
        type: RECIEVE_GENRES,
        payload,
    }
}

export function createStatus(payload){
    return{
        type:CREATE_STATUS,
        payload
    }
}

//llamar juegos.
export function getGames(){
    return (dispatch) => {
        dispatch(getData());
        axios.get('/videogames')
        .then((response) => dispatch(recieveGames(response.data)))
        .catch(e => dispatch(recieveGames(e)))
    }
}

//llamar un juego.
export function getGameById(id){
    return async (dispatch) => {
        dispatch(getData());
        try{
            let response = await axios.get(`/videogame/${id}`);
            dispatch(recieveAGame(response.data));
        }catch(e){
            dispatch(recieveAGame(e));
        }
    }
}

//llamar plataformas;
export function getPlatforms(){
    return async (dispatch) => {
        try{
            let response = await axios.get(`/platforms`);
            console.log(response);
            dispatch(recievePlatforms(response.data));
        }catch(e){
            dispatch(recievePlatforms(e.message));
        }
    }
}

//llamar generos
export function getGenres(){
    return async (dispatch) => {
        try{
            let response = await axios.get(`/genres`);
            dispatch(recieveGenres(response.data));
        }catch(e){
            dispatch(recieveGenres(e.message));
        }
    }
}


//crear juego
export function createGame(data){
    return async (dispatch) => {
        try{
            await axios.post(`/videogames`, data);
            dispatch(createStatus('Game has been created'));
        }catch(e){
            dispatch(createStatus(`Something was wrong, please try again.`));
        }
    }
}
