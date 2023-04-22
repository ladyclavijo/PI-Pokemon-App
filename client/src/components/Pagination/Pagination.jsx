import React from "react";



//declaro mi paginado , me traigo "pokemonsPerPage, allPokemons, pagination" del componente "Home"        // declaro un arreglo vacío
// recorro un arreglo en el que voy a tomar el número q resulta de dividir "allPokemons/pokemonsPerPage" y con ese resultado que genero, lo voy a pushear en mi arreglo vacío "pageNumbers"   

const Pagination = ({ pokemonsPerPage, pokemons, pagination }) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(pokemons/pokemonsPerPage); i++) { //el math.ceil me redondea el numerito
    pageNumbers.push(i + 1) 
  }

// renderizo para que me vaya devolviendo cada numerito del paginado
  return(
    <nav>
      <ul>
        {pageNumbers && pageNumbers.map(number => {

            return (          
            <li key={number}>
            <button onClick={() => pagination(number)}>
              {number}
              </button>
            </li>
            )
          })}
      </ul>
    </nav>
  )
};
export default Pagination;