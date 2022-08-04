const express = require('express');
const route = express.Router();
const axios = require('axios');
const {Platform} = require('../../db');
const { API_KEY } = process.env;


route.get('/', async (req, res) => {
    try{
        let platforms = await Platform.findAll();
        let totalPlataformas = [];

        if(!platforms.length){
            let apiPlatforms = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
            await apiPlatforms.data.results.map(game => {
                return game.platforms.map(plataforma => totalPlataformas.push(plataforma.platform.name));
            });
        }

        let plataformas = new Set(totalPlataformas);
        let result = [...plataformas];

        result.forEach(p => {
            Platform.create({
                name: p,
            })
        });

        let data = await Platform.findAll();

        res.send(data);

    }catch(e){
        res.status(400).send({error: e.message});
    }
});

module.exports = route;
