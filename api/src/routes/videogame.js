require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const { Router } = require('express');
const {Videogame, Category, Platform} = require('../db.js');
const videogame = Router();

videogame.get("/:idVideogame", async (req, res, next) => {
	try{
		const {idVideogame} = req.params;
		// Busqueda de un juego
		if(idVideogame){
			var game = null;
			const data = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
			// Si se encuentra el juego
			if(!data.data.detail){
				game = {
					name: data.data.name,
					background_image: data.data.background_image,
					categories: data.data.genres.map(genre => genre.name),
					description: data.data.description,
					released: data.data.released,
					rating: data.data.rating,
					platforms: data.data.platforms.map(plat => plat.platform.name)
				};
			}
			if(game === null){
				game = await Videogame.findOne({
				    where: {id: idVideogame},
				    include: [Category, Platform]
				});
			}

			if(game && game !== null) res.status(200).json(game);

			// Si no hay resultados
		}
		else{
			res.status(404).json({msg: "Game Not Found"});
		}
	} catch(error){
		next(error);
	}
});

videogame.post("/", async (req, res, next) => {
	try{
		const {name, description, releaseDate, rating, platforms, genres} = req.body.form;
		const [game, created] = await Videogame.findOrCreate({
		    where: {name},
		    defaults: {name, description, releaseDate, rating, platforms}
		});

		genres.forEach(async genre => {await game.setCategories(genre)});
		platforms.forEach(async plat => {await game.setPlatforms(plat)});

		res.status(200).json({created, game});
	} catch(error){
		next(error);
	}
});

module.exports = videogame;