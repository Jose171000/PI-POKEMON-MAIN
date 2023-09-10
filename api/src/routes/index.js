const { Router } = require('express');
// Importar todos los routers;
const {pokemonRoute} = require("./pokemons")
const {typesRoute} = require("./types")
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokemonRoute)
router.use("/types", typesRoute)


module.exports = router;
