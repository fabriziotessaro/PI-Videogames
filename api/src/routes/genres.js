require('dotenv').config();
const {API_KEY} = process.env;
const { Router } = require('express');
const {Category} = require('../db.js');
const genres = Router();

genres.get("/", async (req, res, next) => {
	try{
		const genres = await Category.findAll();
		res.status(200).json({count:genres.length ,genres});
	} catch(error){
		next(error);
	}
});

module.exports = genres;