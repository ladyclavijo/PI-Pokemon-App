const axios = require('axios');

require('dotenv').config();
const { URL_POKEMON } = process.env;


//la funcion findAll usa axios para realizar una solicitud a la url de la API, la cual devuelve una lista de Pokemon con un límite de 100 pokes
//después recorre esa lista y almacena las urls de cada pokemon en el arreglo 'pokemonsUrl'
//para cada url en 'pokemonsUrl' se hace una solicitud a la API usando axios esperando que devuelva una respuesta y una vez que se recibe esa respuesta, se extraen los datos del pokemon y los almacena en una variable

const findAllApi = async() => {
    const { data } = await axios.get(`${URL_POKEMON}?limit=100`); //hago destructuring de la data de axios
    const pokemonUrl = [];

    
        data.results.map((el) => { //con el destructuring evito colocar "el nombre de la variable".data 
        pokemonUrl.push(axios.get(el.url).then((response) => response.data)); 
    })
 //resumen: uso la API para tomar la info sobre los pokemon y los tipos y luego almaceno esa info en la BD
//utilizo la función Promise.all para procesar un arreglo llamado pokemonUrl. Esta promesa devuelve el arreglo que contiene info detallada de c/ pokemon que se encuentra en ese arreglo (pokemonUrl)

const pokemonProps = Promise.all(pokemonUrl).then(
    (response) =>
      response.map((e) => {

//la promesa usa la función map para recorrer cada objeto dentro del arreglo y para cada objeto se crea un nuevo objeto con las propiedades (id, name, etc..) las cuales se extraen de las props del objeto original

        return {
          id: e.id,
          name: e.name,
          img: e.sprites.other.dream_world.front_default,
          types: e.types.map((el) => el.type.name),
          hp: e.stats[0].base_stat,
          attack: e.stats[1].base_stat,
          defense: e.stats[2].base_stat,
          speed: e.stats[5].base_stat,
          height: e.height,
          weight: e.weight,
          createdDB: false
        };
    })
    );
    return await pokemonProps; //espera y retorna el nuevo arreglo
  };


  module.exports = findAllApi