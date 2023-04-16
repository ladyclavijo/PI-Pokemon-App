const { Pokemon, Type } = require('../db'); // importo los modelos de la base de datos


// la fn createPokemon crea un nuevo objeto pokemon con los atributos especificados como argumentos (name, type, etc..) ; 
//la fn usa una opera asincrona y espera la creación de un objeto pokemon, usando el método "create" y una vez creado el objeto, lo devuelve
const createPokemon = async ( 
    name,
    image,
    type,
    hp,
    attack,
    defense,
    speed,
    height,
    weight
) => {

//creo la const newPokemon para crear un nuevo pokemon a partir de la info que me traigo del body 
    try {
        const newPokemon = await Pokemon.create({
            name,
            image: image ? image : "https://freepngimg.com/thumb/pokemon/20118-5-pokemon-thumb.png",
            type,
            hp,
            attack,
            defense,
            speed: speed ? speed : 0,
            height: height ? height : 0,
            weight: weight ? weight : 0
        })
//creo la const pokeType para encontrar con el método "findAll" dentro de mi modelo de Type, donde el nombre sea el tipo que traigo por body

        const pokeType = await Type.findAll({
            where: {name: type}
        })

        newPokemon.addType(pokeType); 
        
    } catch (error) {
        return error  
    }

};

module.exports = createPokemon




