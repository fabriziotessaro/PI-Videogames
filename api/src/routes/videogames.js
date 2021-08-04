require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const { Router } = require('express');
const videogames = Router();

videogames.get("/", async (req, res) => {
	try{
		const {name} = req.query;
		// Busqueda de un juego
		if(name){
			const data = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
			// Si se encuentra al menos un resultado
			if(data.data.count > 0){
				let games = data.data.results.map(game => {
					return{
						name: game.name,
						background_image: game.background_image,
						genres: game.genres.map(genre => genre.name)
					}
				});
				games.splice(15);
				res.status(200).json({count: games.length, games});
			}
			// Si no hay resultados
			else{
				res.status(404).json({msg: "Game Not Found"});
			}
		}
		// Traer todos los juegos
		else{
			const data = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
			let games = data.data.results.map(game => {
				return{
					name: game.name,
					background_image: game.background_image,
					genres: game.genres
				}
			});
			res.status(200).json({count: games.length, games});
		}
	} catch(error){
		res.status(500).json({error});
	}
});

module.exports = videogames;