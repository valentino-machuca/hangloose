const express = require('express');
const route = express.Router();
const axios = require('axios');
const {Videogame, Genre, Platform} = require('../../db');
const { API_KEY } = process.env;

let getApiGames = async() => {

    let games = [];
    let promises = [];

    for(let i = 1; i <= 5; i++){//Utilizo un bucle para cambiar las paginas de la api.
            let call = axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}&page_size=20`);
            promises.push(call);  //Creo un array de promesas para hacer el llamado mas rapido
    }

    await Promise.all(promises).then(response => response.map((page) => {
        let apiGames = page.data.results.map(g => {
            return {
                id: g.id,
                name: g.name,
                bg_img: g.background_image,
                rating: g.rating,
                platforms: g.parent_platforms.map(p => p.platform.name),
                genres: g.genres.map(g => g.name),
                isDb: false,
            }
        });
        games.push(apiGames);
    }));

    return games.flat()//Como cada llamado devuelve un array con data, hago un flat para para unificar todos esos subsarrays.
    //     //Ej:
    //     //      [[d1],[d2],[d3]].flat() ==> [d1, d2, d3];
};

let getDbGames = async () =>{
    try{
        let games = await Videogame.findAll({
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

        let dbGames = games.map(game => {
            return {
                id: game.id,
                name: game.name,
                bg_img: game.cover,
                rating: game.rating,
                genres: game.Genres.map(genre => genre.name),
                platforms: game.Platforms.map(platform => platform.name),
                isDb: true,
            }
        });

        return dbGames;
    }catch(e){
       throw new Error(e.message);
    }
}

let getAllGames = async () =>{
    try{
        let apiGames = await getApiGames();
        let dbGames = await getDbGames();
        let games = [...apiGames, ...dbGames]; //Uno los juegos de la api y de la db.
        // console.log(games.length);
        return games;
    }catch(e){
        throw new Error(e);
    }
}



route.post('/', async (req, res)=>{  //Endpoint de tipo Post para crear un game.
    const {name, description, release, rating, cover, genres, platforms, publisher} = req.body;
    try{
        const newGame = await Videogame.create({
            name,
            description,
            release,
            rating,
            cover,
            publisher,
        });
        await newGame.setGenres(genres);
        await newGame.setPlatforms(platforms);
        res.send(newGame);
    }catch(e){
        res.status(400).send({error: e});
    }
});

route.get('/', async (req, res) => { //Endpoint para llamar a la api y db.

    try{
        let response = await getAllGames();
        res.send(response);

    }catch(e){
        res.status(400).send({error: e});
    }
});



module.exports = route;

/*
[ ] POST /videogames:
    - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
    - Crea un videojuego en la base de datos, relacionado a sus géneros.

[ ] GET /videogames:
    - Obtener un listado de los videojuegos
    - Debe devolver solo los datos necesarios para la ruta principal

[ ] GET /videogames?name="...":
    - Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
    - Si no existe ningún videojuego mostrar un mensaje adecuado
*/