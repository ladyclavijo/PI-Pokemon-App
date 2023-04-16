const { Pokemon, Type } = require('../db'); // importo los modelos de la base de datos


//la fn findById busca en la BD el pokemon que tenga el mismo ID que el valor pasado como parámetro (utilizando la biblioteca sequelize)
//la fn es asíncrona y devuelve un objeto que contiene la info sobre el pokemon 


 //************ VER SINTAXIS PARA AGREGAR LOS TYPES **************

const findByIdDb = async (id) => { 
  try {
    const pokemon = await Pokemon.findOne({
      where: { id: id },
      include: [Type]
    });
    return pokemon;

  } catch (error) {
    return error    
  }   
};

module.exports = findByIdDb;