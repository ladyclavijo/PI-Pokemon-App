const axios = require('axios');

require('dotenv').config();
const { URL_POKEMON } = process.env;


const findByIdApi = async (id) => {
    try {
      const { data } = await axios.get(`${URL_POKEMON}/${id}`); 
      return {
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
    } catch (error) {
      return { error: "Pokemon not found" };
    }
  };


  module.exports = findByIdApi