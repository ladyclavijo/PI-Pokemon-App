const { Pokemon, Type } = require('../db'); // importo los modelos de la base de datos
const findAllApi = require('../controllers/getPokemonsByApi');

//la función findAllPokemon busca y devuelve todos los pokemon disponibles en la BD y en la API de pokemon
// uso la función findAll para obtener todos los pokemon disponibles en la BD y los almaceno en la var "pokemons"

const findAllPokemon = async () => {

    try {
        const pokemons = await Pokemon.findAll({
            include: [{
                model: Type,
                attributes: ['name'],
                through:{
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                  }
            }]
        });
                
        const pokemonsApi = await findAllApi(); 
        const allPokemons = [...pokemons, ...pokemonsApi]

        console.log(allPokemons.length + 'Gracias a Alex estoy mejor!!!')
        return allPokemons ;
              
    } catch (error) {
        return error        
    }    
  };

   module.exports = findAllPokemon