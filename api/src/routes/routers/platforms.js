const express = require('express');
const route = express.Router();
const axios = require('axios');
const {Platform} = require('../../db');
const { API_KEY } = process.env;


route.get('/', async (req, res) => {
    try{
        let platforms = await Platform.findAll();

        if(!platforms.length){
            let apiPlatforms = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`);
            await apiPlatforms.data.results.map(platform => {
                Platform.create({
                    name: platform.name
                })
            });
        }

        platforms = await Platform.findAll();
        res.send(platforms);
    }catch(e){
        res.status(400).send({error: e.message});
    }
});

module.exports = route;
