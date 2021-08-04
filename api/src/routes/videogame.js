require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const { Router } = require('express');
const {Videogame} = require('../db.js');
const videogame = Router();

videogame.get("/:idVideogame", async (req, res) => {
	try{
		const {idVideogame} = req.params;
		// Busqueda de un juego
		if(idVideogame){
			const data = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
			// Si se encuentra el juego
			if(!data.data.detail){
				let game = {
					name: data.data.name,
					background_image: data.data.background_image,
					genres: data.data.genres.map(genre => genre.name),
					description: data.data.description,
					released: data.data.released,
					rating: data.data.rating,
					platforms: data.data.platforms.map(plat => plat.platform.name)
				};
				res.status(200).json({game});
			}
			// Si no hay resultados
			else{
				res.status(404).json({msg: "Game Not Found"});
			}
		}
	} catch(error){
		res.status(500).json({error})
	}
});

videogame.post("/", async (req, res) => {
	try{
		const {name, description, releaseDate, rating, platforms} = req.body.form;
		const [game, created] = await Videogame.findOrCreate({
		    where: {name},
		    defaults: {name, description, releaseDate, rating, platforms}
		});

		res.status(200).json({created, game});
	} catch(error){
		res.status(500).json({error})
	}
});

module.exports = videogame;