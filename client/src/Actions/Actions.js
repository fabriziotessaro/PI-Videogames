import axios from 'axios';

// reducer-actions types:

const GET_VIDEOGAMES = "GET_VIDEOGAMES";
const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";

export default function getVideogames(name){
	return async function(dispatch){
		const data = await axios.get("http://localhost:3000/videogames");
		return dispatch({type: GET_VIDEOGAMES, payload: data});
	}
}

export default function getVideogameDetail(id){
	return async function(dispatch){
		const data = await axios.get(`http://localhost:3000/videogame/${id}`);
		return dispatch({type: GET_VIDEOGAMES, payload: data});
	}
}
