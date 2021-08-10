import axios from 'axios';

// reducer-actions types:
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";

export function getVideogames(name){
	return async function(dispatch){
		var data;
		if(name){

			data = await axios.get(`http://localhost:3001/videogames?name=${name}`);
		} 
		else {
		 	data = await axios.get("http://localhost:3001/videogames");
		}
		return dispatch({type: GET_VIDEOGAMES, payload: data.data});
	}
}

export function getVideogameDetail(id){
	return async function(dispatch){
		const data = await axios.get(`http://localhost:3001/videogame/${id}`);
		return dispatch({type: GET_VIDEOGAME_DETAIL, payload: data.data});
	}
}

export function getGenres(){
	return async function(dispatch){
		const data = await axios.get(`http://localhost:3001/genres`);
		return dispatch(data.data);
	}
}