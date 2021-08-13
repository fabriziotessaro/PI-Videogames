require('dotenv').config();
const {API_KEY} = process.env;
const { Router } = require('express');
const {Platform} = require('../db.js');
const platforms = Router();

platforms.get("/", async (req, res, next) => {
	try{
		const platforms = await Platform.findAll();
		res.status(200).json({count:platforms.length ,platforms});
	} catch(error){
		next(error);
	}
});

module.exports = platforms;