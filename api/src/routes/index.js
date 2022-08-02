const express  = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = express.Router();
const videogamesRouter = require('./routers/videogames');
const videogameRouter = require('./routers/videogame');
const genresRouter = require('./routers/genres');
const platformsRouter = require('./routers/platforms');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());
router.use('/videogames', videogamesRouter);
router.use('/videogame', videogameRouter);
router.use('/genres', genresRouter);
router.use('/platforms', platformsRouter);

module.exports = router;
