const { Router } = require("express");
const router = Router();
const allPokemons = require('../controllers/allPokemons');
const getPokemonByNameApi = require('../controllers/getPokemonByNameApi');
const getPokemonByNameDb = require('../controllers/getPokemonByNameDb');
const getPokemonByIdApi = require('../controllers/getPokemonsByIdApi');
const getPokemonByIdDb = require('../controllers/getPokemonByIdDb');
const createPokemon  = require('../controllers/createPokemon')
const { Pokemon } = require('../db'); // importo los modelos de la base de datos

//ruta para busqueda API NAME y DB NAME
router.get('/pokemons/name', async (req, res) => {

    try {
        const { name } = req.query;
        const allPokemon = await allPokemons();

    if (name) {

        const pokemonByNameApi = await getPokemonByNameApi(name);
        const pokemonByNameDb = await getPokemonByNameDb(name);

    if (!pokemonByNameApi && !pokemonByNameDb) return res.status(404).send('Name not found') 

        const pokemonName = [...[pokemonByNameDb], ...[pokemonByNameApi]]
       
        return res.status(200).send(pokemonName)
    }

    if (!name) { 
        return res.status(200).send(allPokemon)
    }
    }
        catch (error) {
        return res.status(404).send(error)  
    }
});

//ruta para busqueda API ID y DB ID
router.get('/pokemons/:id', async(req, res) => {
    try {
        const { id } = req.params;
    
        if(!id) return res.status(404).send('error')
        //pregunto si el id posee un -, ya que los ids creados con uudi4 los poseen y los de la API no
        if (id.includes('-')) {

            const pokemonsIdByDb = await getPokemonByIdDb(id); 
            if (!pokemonsIdByDb) {
            res.status(404).send('Pokemon not found') 
            } else {
            res.status(200).send(pokemonsIdByDb)
            }
                    
        } else {
        const pokemonsIdByApi = await getPokemonByIdApi(id);
        res.status(200).send(pokemonsIdByApi)
        }
    } catch (error) {
        res.status(400).send(error)
    }
});

// ruta para crear un pokemon en la BD
router.post('/pokemons', async (req, res) => {
    try {
        const {name, image, type, hp, attack, defense, speed, height, weight} = req.body;

        if(!name || !type || !hp || !attack || !defense || !speed ){
          return res.status(404).send('Missing data')
        }
        const newPokemon = await createPokemon(name, image, type, hp, attack, defense, speed, height, weight)
          return res.status(200).send(`The Pokemon ${name} was created succesfully!`)
        
    } catch (error) {
        return res.status(404).send(error)        
    }
});

// router.delete('/:idPokemon', async (req, res) => {
//     try {
//         const {idPokemon} = req.params
//         console.log(idPokemon + 'estamos con Sebita')
//         await Pokemon.destroy({where: {id: idPokemon}})
                
//         res.status(200).send(`pokemon removed`)
//     } 
//     catch (error) {
//         res.status(404).send(error)
//     }
// });

// router.put('/:idPokemon', async (req, res) => {
//     try {
//         const {idPokemon} = req.params
//         const {name, type, image, hp, attack, defense, height, weight} = req.body;
//         const updated = await Pokemon.update({
//             name: name,
//             image: image,
//             type: type,
//             hp: hp,
//             attack: attack,
//             defense: defense,
//             height: height,
//             weight: weight
//         },
//         {
//             where: {
//                 id: idPokemon
//             }
//         });
//         res.status(200).send(`${updated} pokemon updated`);
//     }
//      catch (error) {
//         res.status(404).send(error)
//       }
// });

module.exports = router