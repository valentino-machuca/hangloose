const express = require('express');
const route = express.Router();
const axios = require('axios');
const {Genre} = require('../../db');
const { API_KEY } = process.env;


route.get('/', async (req, res) => {
    try{
        let genres = await Genre.findAll();

        if(!genres.length){
            let apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
            await apiGenres.data.results.map(genre => {
                Genre.create({
                    name: genre.name
                })
            });
        }

        genres = await Genre.findAll();
        res.send(genres);
    }catch(e){
        res.status(400).send({error: e.message});
    }
});

module.exports = route;
