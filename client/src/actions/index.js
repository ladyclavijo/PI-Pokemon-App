import axios from "axios";

// defino una fn llamada getPokemons que devuelve una fn asíncrona. La fn asíncrona hace una solicitud GET a la ruta '/pokemons' usando axios. Una vez que se recibe la respuesta del servidor, se utiliza la fn dispatch para enviar una acción con el tipo "GET_POKEMONS" y el objeto data obtenido de la respuesta JSON del servidor como su payload 

export const getAllPokemons = () => {
    return async(dispatch) => {
        try {
            let response = await axios.get("/pokemons");
            return dispatch({
                type: "GET_ALL_POKEMONS",
                payload: response.data
            });    
        } catch (error) {
            alert ("I can't get all the Pokemons", error.message)            
        }
    }
};


export const getPokemonID = (id) => {
    return async(dispatch) => {
        try {
            let response = await axios.get(`/pokemons/${id}`);
            const pokemonID = response.data; 
            return dispatch({
                type: "GET_POKEMON_ID",
                payload: pokemonID
            });    
        } catch (error) {
            alert ("I can't get that Pokemon", error.message)         
        }
    }
};


export const getPokemonName = (name) => {
    return async(dispatch) => {
        try {
            let response = await axios.get(`/pokemons?name=${name}`);
            const pokemonName = response.data;
              return dispatch({
                  type: "GET_POKEMON_NAME",
                  payload: pokemonName
              });
        } catch (error) {
            alert(`The Pokemon "${name}" doesn't exist`,error.message)
        }
    }
};

export const getAllTypes = () => {
    return async(dispatch) => {
        try {
            let response = await axios.get("/types");
            const allTypes = response.data;
            return dispatch({
                type: "GET_ALL_TYPES",
                payload: allTypes
            });
        } catch (error) {
            alert ("I can't get all the types", error.message)
        }
    }
};


export const filterByTypes = (payload) => {
        return (dispatch) => {
            return dispatch({type: "FILTER_BY_TYPES", payload})
        }
};


export const createPokemon = async (payload) => {
    return async(dispatch) => {
        let response = await axios.post("/pokemons", payload); 
        return dispatch({
            type: "CREATE_POKEMON",
            payload: response
        })  
    }
};


export const orderByName = (payload) => {
    return (dispatch) => {
        return dispatch({
            type: "ORDER_BY_NAME",
            payload
        })
    }
};


export const orderByAttack = (payload) => {
    return(dispatch) => {
        return dispatch({
            type: "ORDER_BY_ATTACK",
            payload
        })
    }
};


export const deletePokemon = (id) => {
    return async(dispatch) => {
      try {
        let response = await axios.delete(`/pokemons/delete/${id}`)
        return dispatch({
          type: "DELETE_POKEMON",
          payload: response
        })
        
      } catch (error) {
        alert ("Couldn't remove Pokemon")
      }
    }
  };


  export const currentPage = (payload) => {
    return(dispatch) => {
      return dispatch({
        type: "CURRENT_PAGE", 
        payload})
    }
  };
