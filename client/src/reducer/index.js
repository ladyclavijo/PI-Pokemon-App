const initialState = {
 // objeto de estados globales
     pokemons: [],
 copyPokemons: [],
        types: [],
    copyTypes: [],
       detail: []
};


function rootReducer (state= initialState, action) {
    switch(action.type) {
        case "GET_ALL_POKEMONS":
            return{
                ...state,
                pokemons: action.payload,
            copyPokemons: action.payload
            };

        case "SEARCH_NAME":    
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

        case "NEW_POKEMON":
            return {
                ...state
            };

        case "DETAIL":
            return {
                ...state,
                detail: action.payload // un solo poke
            };

        case "FILTER_TYPES":
          const allPokemons = state.copyPokemons;
          const filterPokemons = action.payload === 'all' ? allPokemons.filter(p => p.types.length > 0)
          : allPokemons.filter(p => p.types.find(p => p.name ? p.name === action.payload : p === action.payload))
        return{
          ...state,
          pokemons: filterPokemons
        };

        case "FILTER_CREATED":
            const all = state.copyPokemons; // la cta all es = al estado actual de los pokemons
            const createdFilter = action.payload === "createdDB" ? all.filter((p) => p.createdDB === true)  // esta cte se establece mediante el uso de un oper. ternario // si el payload de la acción es cDB, la cte "createdFilter" = a todos los pokes que se crearon en la BD
            : all.filter((p) => p.createdDB === false); // si el payload no es cDB, entonces "createdFilter" 
                 
            return {
                ...state,
                pokemons: action.payload === "all" ? all : createdFilter
            };

         
            
        case "ORDER_AZ":
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


          case "ORDER_ATTACK":
            const orderingAttack = action.payload === 'attackAsc' ?
            state.pokemons.sort((a, b) => Number(b.attack) - Number(a.attack))
            :
            state.pokemons.sort((a, b) => Number(a.attack) - Number(b.attack))
            return{
              ...state,
              pokemons: orderingAttack
            };

         case "CLEAR_FILTERS":
            const copyPokemons = state.copyPokemons
            return{
                ...state,
              pokemons: copyPokemons

            }



              
          default:
             return state; // si la acción no es de tipo "ORDER_ATTACK", se devuelve el estado actual sin modificaciones
            
    }
}

export default rootReducer;