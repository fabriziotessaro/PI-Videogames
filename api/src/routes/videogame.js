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

			if(idVideogame.length === 36){
				game = await Videogame.findByPk(idVideogame,{
				    include: [Category, Platform]
				});
			}
			else {
				const dataAPI = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
				// Si se encuentra el juego
				if(dataAPI.data.detail !== "Not found."){
					game = {
						name: dataAPI.data.name,
						background_image: dataAPI.data.background_image,
						categories: dataAPI.data.genres,
						description: dataAPI.data.description,
						released: dataAPI.data.released,
						rating: dataAPI.data.rating,
						platforms: dataAPI.data.platforms.map(plat => {return{
							id: plat.platform.id,
							name: plat.platform.name
						}}),
					};
				}
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
		const {name, description, background_image, releaseDate, rating, platforms, genres} = req.body.form;
		const [game, created] = await Videogame.findOrCreate({
		    where: {name},
		    defaults: {name, description, background_image, releaseDate, rating}
		});
		if(created){
			await game.setCategories(genres);
			await game.setPlatforms(platforms);
		}
		
		res.status(200).json({created, game});
	} catch(error){
		next(error);
	}
});

module.exports = videogame;