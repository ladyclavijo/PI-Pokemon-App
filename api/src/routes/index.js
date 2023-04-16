const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


const pokemonRoute = require('../routes/pokemonRouter');
const typeRoute = require('../routes/typeRouter');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/pokemons', pokemonRoute);
router.use('/types', typeRoute);


module.exports = router; //es el que tiene la responsabilidad de definir las rutas!!!