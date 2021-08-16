import axios from 'axios';

// reducer-actions types:
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const GET_FILTERED_VIDEOGAMES = "GET_FILTERED_VIDEOGAMES";
export const POST_VIDEOGAME = "POST_VIDEOGAME";

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

export function postVideogame(videogame){
	return async function(dispatch){
		const data = await axios.post(`http://localhost:3001/videogame`, {form:videogame});
		return dispatch({type: POST_VIDEOGAME, payload: data.data});
	}
}

export function getGenres(){
	return async function(dispatch){
		const data = await axios.get(`http://localhost:3001/genres`);
		return dispatch({type: GET_GENRES, payload: data.data});
	}
}

export function getPlatforms(){
	return async function(dispatch){
		const data = await axios.get(`http://localhost:3001/platforms`);
		return dispatch({type: GET_PLATFORMS, payload: data.data});
	}
}

export function getFilteredVideogames(filterList){
	// quita de los filtros a los que no se les haya asignado un tipo de filtrado
	// distinto al 'see-all' default

	for(var key in filterList){
		if(filterList[key] === "default") delete filterList[key];
	}
	if(Object.keys(filterList).length > 0){
		// crea una funcion que va a filtrar la lista de juegos en el reducer
		const filtradoSUPREMO = function (videogamesList){
			// filtra por categoria
			if(filterList.hasOwnProperty("categories")){
				videogamesList = videogamesList.filter(game => {
					let found = game.categories.find(cat => parseInt(cat.id) === parseInt(filterList.categories))
					return found !== undefined
				});
			}

			// filtra por paltaforma
			if(filterList.hasOwnProperty("platforms")){
				videogamesList = videogamesList.filter(game => {
					let found = game.platforms.find(plat => parseInt(plat.id) === parseInt(filterList.platforms))
					return found !== undefined
				});
			}
			
			// filtra si es de la API o de la BD
			if(filterList.hasOwnProperty("isMyGame")){
				videogamesList = videogamesList.filter(game => game.isMyGame === filterList.isMyGame)
			}
			// si aun hay juegos, los ordena
			if(videogamesList.length > 0){
				// alfabeticamente
				if(filterList.hasOwnProperty("order")){
					// orden A-Z
					if(filterList.order === "A-Z"){
				    	[...videogamesList] = videogamesList.sort((a, b) => {
				        return a.name.localeCompare(b.name)
				      });
				    }
				    /* -------------------------------------------------------- */
				    // orden Z-A
				    else if(filterList.order === "Z-A"){
				    	[...videogamesList] = videogamesList.sort((a, b) => {
				          return b.name.localeCompare(a.name);
				      });
				    }
				    /* -------------------------------------------------------- */
				    // rating asc
				    else if(filterList.order === "Rasc"){
				    	[...videogamesList] = videogamesList.sort((a, b) => {
				        if (a.rating < b.rating)
				          return -1;
				        return 0;
				      });
				    }
				    /* -------------------------------------------------------- */
				    // rating desc
				    else if(filterList.order === "Rdesc"){
				    	[...videogamesList] = videogamesList.sort((a, b) => {
				        if (a.rating > b.rating)
				          return -1;
				        return 0;
				      });
				    }
				}
			}
			return videogamesList;
		}
		// retorna la funcion de filtrado
		return ({type: GET_FILTERED_VIDEOGAMES, payload: filtradoSUPREMO});
	}
	else{
		return ({type: GET_FILTERED_VIDEOGAMES, payload: false});
	}	
}