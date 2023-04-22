const initialState = {     //el initialState se guarda en el store
 // objeto de estados globales
     pokemons: [], 
 copyPokemons: [], 
        types: [],
    copyTypes: [],
       detail: [] // guardo 1 solo poke
};


function rootReducer (state= initialState, action) { 
    switch(action.type) {
        case "GET_ALL_POKEMONS":
            return{
                ...state,
                pokemons: action.payload,
            copyPokemons: action.payload
            };

        case "GET_POKEMON_ID":    
        return {
            ...state,
            pokemons: action.payload,
        };    

        case "GET_POKEMON_NAME":    
            return {
                ...state,
                pokemons: action.payload,
            };

        case "GET_ALL_TYPES":
            return {
                ...state,
                types: action.payload,
            copyTypes: action.payload
            };


        case "FILTER_BY_TYPES": ////////////////// **************************** types.. type ???????????????? si cambio aquí, cambio en home
          const allPokemons = state.pokemons;
          const filterPokemons = action.payload === 'all' ? allPokemons.filter(p => p.types.length > 0)
          : allPokemons.filter(p => p.types.find(p => p.name ? p.name === action.payload : p === action.payload))
        return{
          ...state,
          pokemons: filterPokemons
        };

        case "CREATE_POKEMON":
            const all = state.pokemons; // la cta all es = al estado actual de los pokemons
            const createdFilter = action.payload === "createdDB" ? all.filter((p) => p.createdDB === true)  // esta cte se establece mediante el uso de un oper. ternario // si el payload de la acción es cDB, la cte "createdFilter" = a todos los pokes que se crearon en la BD
            : all.filter((p) => p.createdDB === false); // si el payload no es cDB, entonces "createdFilter" 
                 
            return {
                ...state,
                pokemons: action.payload === "all" ? all : createdFilter
            };

         
            
        case "ORDER_BY_NAME":
          const orderingName = action.payload === "asc" ? // si el actionpayload es asc, entonces accede al estado pokemons que es el q se está renderizando y hazle un sort
          state.pokemons.sort((a ,b) => { // lo que hace el sort es comparar 2 valores, en este caso los nombres por orden alfabético, primero de forma ascendente
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
            if(b.name.toLowerCase() > a.name.toLowerCase()) return -1
            return 0
          })
          :
          state.pokemons.sort((a, b) => { // si el valor de "payload" es "desc", se hará una ordenación similar, pero en orden descendente
            if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
            if(b.name.toLowerCase() > a.name.toLowerCase()) return 1
            return 0
           })
          return {
            ...state,
            pokemons: orderingName, // se devuelve un nuevo objeto de estado con la propiedad "pokemons" actualizada con la lista ordenada
          };



          case "ORDER_BY_ATTACK":
            const orderingAttack = action.payload === 'attackAsc' ?
            state.pokemons.sort((a, b) => Number(b.attack) - Number(a.attack))
            :
            state.pokemons.sort((a, b) => Number(a.attack) - Number(b.attack))
            return{
              ...state,
              pokemons: orderingAttack
            };
            
            

          case "DELETE_POKEMON":
            const deletedPokemon = state.pokemons.filter(p => p.id !== action.payload);
            return{
                ...state,  
                pokemons: deletedPokemon,
                copyPokemons: deletedPokemon  
            };



          case "CURRENT_PAGE":
            return{
               ...state, 
               currentPage: action.payload             
            };
        

        default: return state;

        }
}

export default rootReducer;