require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const { Router } = require('express');
const videogames = Router();

videogames.get("/", async (req, res) => {
	try{
		const data = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
		console.log(data.data)
		const games = data.data.results.map(game => {
			return{
				name: game.name,
				background_image: game.background_image,
				genres: game.genres
			}
		});
		res.status(200).json(games);
	} catch(error){
		next(error);
	}
});

module.exports = videogames;