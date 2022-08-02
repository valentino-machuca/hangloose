//Declaracion de actions types
import { GET_DATA, RECIEVE_GAMES, RECIEVE_A_GAME, RECIEVE_PLATFORMS, RECIEVE_GENRES,  FILTER_GAMES, SET_ALL_GAMES, CREATE_STATUS } from "../actions";

//Estado inicial
const initialState = {
    games: [],
    allGames: [],
    isFiltered: false,
    game: [],
    genres: [],
    platforms: [],
    loading: false,
    createStatus: '',
}

//creamos el reducer y como parametros el estado global con su estado inicial y el action a ejecutar.

export default function rootReducer(state=initialState, {type, payload}){//destructuring para evitar action.type etc..
    switch(type){
        case GET_DATA:
            return {
                ...state,
                loading: true,
            }
        case SET_ALL_GAMES:
            return{
                ...state,
                games: state.allGames,
            }
        case RECIEVE_GAMES:
            return{
                ...state,
                loading: false,
                allGames: payload,
                games: payload,
            }
        case RECIEVE_A_GAME:
            return{
                ...state,
                game: payload,
                loading: false,
            }
        case FILTER_GAMES:
            return{
                ...state,
                games: payload,
            }
        case RECIEVE_PLATFORMS:
            return{
                ...state,
                platforms: payload,
            }
        case RECIEVE_GENRES:
            return{
                ...state,
                genres: payload,
            }
        case CREATE_STATUS:
            return{
                ...state,
                createStatus: payload,
            }
        default:
            return {...state};
    }
}