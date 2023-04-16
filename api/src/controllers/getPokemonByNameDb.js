const { Pokemon, Type } = require('../db'); // importo los modelos de la base de datos
const Sequelize = require('sequelize');
const op = Sequelize.Op;

//uso la función findByNameDb para buscar un pokemon en la BD;
// la función espera recibir como parámetro el nombre del pokemon que quiero buscar en la BD; luego uso el método de sequelize "findOne" para buscar en la tabla "Pokemon" que contenga el mismo nombre que el parámetro recibido
//Una vez encontrado, se almacena en una variable "pokemon" y lo retorna

const findByNameDb = async (name) => {
    try {
        const pokeData = await Pokemon.findOne({
            where: { name: { [op.iLike]: `%${name}%`} },
            include: [{
                model: Type,
                through:{
                  atributes: ['name']
                }
              }]
        });
        console.log(typeof pokeData + 'estamos en pokedata')
        return pokeData;

    } catch (error) {
        return error
    }
};

module.exports = findByNameDb