require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const { Router } = require('express');
const {Videogame, Category, Platform} = require('../db.js');
const { Op } = require("sequelize");
const videogames = Router();

videogames.get("/", async (req, res, next) => {
	try{
		const {name} = req.query;
		// Busqueda de un juego
		if(name){
			// busca en la BD
			const gamesDB = await Videogame.findAll({
				where:{
					name:{ [Op.like]: `${name}%`, }
				},
				include:[Category, Platform]
			});			

			// Luego en la API RAWG
			let dataAPI = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
			// Si se encuentra al menos un resultado lo mapea
			// en un formato que coincida con la BD
			if(dataAPI.data.count > 0){
				const gamesRAWG = dataAPI.data.results.map(game => {
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
			}
			// luego concatena ambos resultados
			const games = [...gamesDB,...gamesRAWG];

			// si encontro juegos, los envia
			if(games.length > 0){
				// solo envia los primeros 15
				if(games.length > 15) games.splice(15);

				res.status(200).json(games);
			}
			// sino, avisa
			else{
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