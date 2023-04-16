const { Pokemon } = require('../db'); // importo los modelos de la base de datos

// defino una fn "updatePokemon" que recibe dos argumentos: "id" y un objeto con varias propiedades. La fn usa "async/await" para trabajar con promesas.
//la fn busca en la BD un pokemon cuyo ID coincida con el que se ha pasado como argumento usando el método "findByPk" (de sequelize). Si no encuentra ningún pokemon, se lanza un error indicando que el pokemon no ha sido encontrado.
//Si se encuentra el pokemon, se actualizan sus props con la info proporcionada usando el método "update" (de sequelize) Al final, la fn devuelve el objeto del pokemon actualizado.
//En caso de que ocurra algún error durante el proceso, lo arroja como resultado


const updatePokemon = async (id, { name, hp, type,  attack, defense, height, weight }) => {
    try {
      const pokemon = await Pokemon.findByPk(id);
      if (!pokemon) {
        throw new Error("Pokemon not found");
      }
      await pokemon.update({ name, hp, type, attack, defense, height, weight  });
      return pokemon;
    } catch (error) {
      return error;
    }
  };


  module.exports = updatePokemon;