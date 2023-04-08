const axios = require('axios');

require('dotenv').config();
const { URL_POKEMON } = process.env;

//la función findByNameAPi busca un pokemon por su nombre en la API
//hago una solicitud GET a la url de la API y la respuesta la guardo en "data" a la cual le apliqué destructuring; extraigo varias propiedades del pokemon (su id, name, etc..) y las devuelvo en un objeto

const findByNameApi = async (name) => {
        
    try {
      const { data } = await axios.get(`${URL_POKEMON}/${name}`);
      
      const pokeApi = {
        id: data.id,
        name: data.name,
        img: data.sprites.other.dream_world.front_default,
        type: data.types.map((el) => el.type.name),
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat, 
        height: data.height,
        weight: data.weight

      };
      console.log(typeof pokeApi + 'estamos en pokeApi')
      return pokeApi

    } catch (error) {
      return {
        error: "Pokemon not found", //sino se encuentra el pokemon, se ejecuta el catch y se devuelve un objeto con un mensaje de error
      };
    }
  };

  module.exports = findByNameApi