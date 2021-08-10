import {
	GET_VIDEOGAMES,
	GET_VIDEOGAME_DETAIL,
	getVideogames,
	getVideogameDetail
} from '../Actions/Actions.js';

const initialState = {
	videogamesLoaded: [],
	videogameDetail: {}
}

export default function rootReducer(state = initialState, action){
	switch(action.type){
		case GET_VIDEOGAMES:
		return{
			...state,
			videogamesLoaded: action.payload.games
		};
		case GET_VIDEOGAME_DETAIL:
		return{
			...state,
			videogameDetail: action.payload
		};
		default:
		return state;
	}
}