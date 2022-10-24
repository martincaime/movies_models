const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const moviesRouter = require('./movie.js');
const peopleRouter = require('./person.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/people', peopleRouter);
router.use('/movies', moviesRouter);


module.exports = router;