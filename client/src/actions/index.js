import axios from "axios";

// defino una fn llamada getPokemons que devuelve una fn asíncrona. La fn asíncrona hace una solicitud GET a la ruta '/pokemons' usando axios. Una vez que se recibe la respuesta del servidor, se utiliza la fn dispatch para enviar una acción con el tipo "GET_POKEMONS" y el objeto data obtenido de la respuesta JSON del servidor como su payload 

export const getAllPokemons = () => {
    return async(dispatch) => {
        try {
            let response = await axios.get("/pokemons");
               return dispatch({
                   type: "GET_POKEMONS",
                   payload: response.data
               });    
        } catch (error) {
            alert ("I can't get all the Pokemons", error.message)            
        }
    }
};


export const getAllTypes = () => {
    return async(dispatch) => {
        try {
            let response = await axios.get("/types");
            return dispatch({
                type: "GET_ALL_TYPES",
                payload: response.data
            });
        } catch (error) {
            alert ("I can't get all the types", error.message)
        }
    }
};


export const getDetail = (id) => {
    return async(dispatch) => {
        try {
            let response = await axios.get(`/pokemons/:id${id}`);
              return dispatch({
                  type: "DETAIL",
                  payload: response.data
              });    
        } catch (error) {
            return error            
        }
    }
};


export const newPokemon = async (payload) => {
    try {
        let response = await axios.post("/pokemons/newpokemon", payload); // ********** /newpokemon ??
        return response  
    } catch (error) {
        return error
    }
};


export const filteredPokemonsTypes = (payload) => {
    try {
        return {
            type: "FILTER_TYPES",
            payload
        }
    } catch (error) {
        return error
    }
};


export const filterCreated = (payload) => {
    try {
        return {
            type: "ORDER_AZ",
            payload
        }
    } catch (error) {
        return error
    }
};


export const searchName = (name) => {
    return async(dispatch) => {
        try {
            let response = await axios.get(`/pokemons/name?name=${name}`);
              return dispatch({
                  type: "SEARCH_NAME",
                  payload: response.data
              });
        } catch (error) {
            alert("Pokemon not found")
        }
    }
};


export function orderUpFallAttack(payload) {
    return {
        type: 'ORDER_ATTACK',
        payload
    }
}


export function clearPage(){
    return {
        type: "CLEAR_PAGE"
    }
};