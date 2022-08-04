const express = require('express');
const route = express.Router();
const axios = require('axios');
const {Videogame, Genre, Platform} = require('../../db');
const { API_KEY } = process.env;

const getGame = async (id) => {
    try{
        if(id.includes('db_')){
            id = id.replace('db_', '');
            let responseDb = await Videogame.findByPk(id, {
                include: [
                    {
                        model:Genre,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model:Platform,
                        attributes:['name'],
                        through: {
                            attributes: [],
                        }
                    }
                ]
            });

            let game = {
                id: responseDb.id,
                name: responseDb.name,
                description: responseDb.description,
                publisher: responseDb.publisher,
                release: responseDb.release,
                cover: responseDb.cover,
                rating: responseDb.rating,
                genres: responseDb.Genres.map(genre => genre.name),
                platforms: responseDb.Platforms.map(platform => platform.name),
                isDb: true,
            }

            return game;

        }else{
            let response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            let responseApi = response.data;

            responseApi = {
                id: responseApi.id,
                name: responseApi.name,
                release: responseApi.released,
                description: responseApi.description_raw,
                cover: responseApi.background_image,
                bg: responseApi.background_image_additional,
                rating: responseApi.rating,
                platforms: responseApi.platforms.map(p => p.platform.name),
                genres: responseApi.genres.map(g => g.name),
                publisher: responseApi.publishers[0].name,
                isDb: false,
            }

            return responseApi;
        }
    }catch(e){
        throw new Error(e);
    }
};

route.get('/:id', async (req, res) => {
    let {id} = req.params;
    try{
        let game = await getGame(id);
        res.status(200).send(game);
    }catch(e){
        res.status(400).send({error: e});
    }
});

module.exports = route;

/*
[ ] GET /videogame/{idVideogame}:
    - Obtener el detalle de un videojuego en particular
    - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
    - Incluir los géneros asociados
*/