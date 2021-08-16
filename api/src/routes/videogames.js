require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const { Router } = require('express');
const {Videogame} = require('../db.js');
const { Op } = require("sequelize");
const videogames = Router();

videogames.get("/", async (req, res, next) => {
	try{
		const {name} = req.query;
		// Busqueda de un juego
		if(name){
			const data = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
			// Si se encuentra al menos un resultado
			if(data.data.count > 0){
				let games = data.data.results.map(game => {
					return{
						id: game.id,
						name: game.name,
						background_image: game.background_image,
						categories: game.genres,
						platforms: game.platforms.map(plat => {return{
							id: plat.platform.id,
							name: plat.platform.name
						}}),
						rating: game.rating,
						isMyGame: false
					}
				});
				if(games.length > 15) games.splice(15);
				res.status(200).json({count: games.length, games});
			}
			// Si no hay resultados
			else{
				const data = await Videogame.findAll({
					where:{
						name:{ [Op.like]: `%${name}%`, }
					}
				});
				let games = data.map(game => {
					return{
						name: game.name,
						categories: game.genres,
						rating: game.rating,
						isMyGame: game.isMyGame
					}
				});
				if(games.length > 15) games.splice(15);

				res.status(404).json({msg: "Game Not Found"});
			}
		}
		// Traer todos los juegos
		else{
			const data = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
			let games = data.data.results.map(game => {
				return{
					id: game.id,
					name: game.name,
					background_image: game.background_image,
					rating: game.rating,
					categories: game.genres,
					platforms: game.platforms.map(plat => {return{
						id: plat.platform.id,
						name: plat.platform.name
					}}),
					isMyGame: false
				}
			});
			res.status(200).json({count: games.length, games});
		}
	} catch(error){
		next(error);
	}
});

module.exports = videogames;