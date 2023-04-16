const axios = require ('axios');

require('dotenv').config();
const { URL_TYPE } = process.env;

const { Type } = require ('../db');

 const getTypesApi = async ()  => {

    let getTypesInfo = async() => { 
        return await Type.findAll() // me traigo toda la info que encuentre en el modelo Type
    }

      try {
    
        if(getTypesInfo.length === 0) {              //aqui pregunto sino existe esa info
        const { data } = await axios.get(URL_TYPE); // sino existe, la traigo de la API
        const dataApi = data.results;               // guardo la info que traigo de la API

    dataApi.map((el) => { // mapeo la info de la API
      Type.findOrCreate({ //entro a Type y busco hacer un match con el nombre del type y el nombre del elemento, sino hay match, lo creo.. si sí lo hay, lo devuelvo
        where: {name: el.name}
      });
    });

    getTypesInfo = await Type.findAll(); // reasigno la variable en la cual voy a buscar toda la info que ahora existe en Type
    // console.log(getTypesInfo.length + ' Todo bien')
      return getTypesInfo //devuelvo toda la nueva info
}
      return getTypesInfo //devuelvo si hay info en Type
}
      catch (error) {
      return error
  }
};

  module.exports = getTypesApi