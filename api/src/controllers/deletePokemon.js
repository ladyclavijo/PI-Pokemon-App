const { Pokemon } = require('../db'); // importo los modelos de la base de datos


// "findByPk" de un método de sequelize que se utiliza para buscar un registro específico en una tabla de BD utilizando su clave primaria

const deletePokemon = async (id) => {
    try {
      const pokemon = await Pokemon.findByPk(id);
      if (!pokemon) {
        throw new Error("Pokemon not found");
      }
      await pokemon.destroy();
      return { message: "Pokemon deleted successfully!" };
    } catch (error) {
      return error;
    }
  };

  module.exports = deletePokemon