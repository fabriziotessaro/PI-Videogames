import {
	GET_VIDEOGAMES,
	GET_VIDEOGAME_DETAIL,
	GET_GENRES,
	GET_FILTERED_VIDEOGAMES,
	POST_VIDEOGAME,
	GET_PLATFORMS,
} from '../Actions/Actions.js';

const initialState = {
	videogamesLoaded: [], // juegos cargados
	videogamesList: [], // lista a la que se le aplicaran los filtros
	videogameDetail: {},
	genres:[],
	platforms:[],
	postAnswer:{} // respuesta del back al postear un nuevo juego
}

export default function rootReducer(state = initialState, action){
	switch(action.type){
		case GET_VIDEOGAMES:
		return{
			...state,
			videogamesLoaded: action.payload.games,
			videogamesList: action.payload.games
		};
		case GET_VIDEOGAME_DETAIL:
		return{
			...state,
			videogameDetail: action.payload
		};
		case POST_VIDEOGAME:
		return{
			...state,
			postAnswer: action.payload
		};
		case GET_GENRES:
		return{
			...state,
			genres: action.payload.genres
		};
		case GET_PLATFORMS:
		return{
			...state,
			platforms: action.payload.platforms
		};
		case GET_FILTERED_VIDEOGAMES:
		if(action.payload){
			return{
				...state,
				videogamesList: action.payload(state.videogamesLoaded)
			};
		} else {
			return{
				...state,
				videogamesList: state.videogamesLoaded
			};
		}
		default:
		return state;
	}
}