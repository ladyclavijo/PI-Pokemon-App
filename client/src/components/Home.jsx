import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";


function Home() {

    const dispatch = useDispatch(); //esto es para utilizar esta constante e ir despachando mis acciones
    const allPokemons = useSelector ((state) => state.pokemons); //esto es lo mismo que hacer el mapStateToProps, lo que hago entonces es crearme la cte allPokemons y con el "useSelector" tráeme en esa cte todo lo que está en el estado de pokemons
    const types = useSelector ((state) => state.types);
    const [order, setOrder] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage; // 1 * 9 = 9
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // 9 - 9 = 0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon); // desde el index 0 al 9 sin incluir el 9

// "pagination" para actualizar el estado de la aplicación al cambiar la pág actual
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
// "ordering" la uso para actualizar el estado de la aplicación al cambiar a la pág actual y el tipo de orden usado en la aplicación
    const ordering = (pageNumber, orderType) => {
        setCurrentPage(pageNumber)
        setOrder(orderType)
      }

//Voy a traerme del estado los pokemons, cuando el componente se monta /// es equivalente a usar el mapStateToProps

    useEffect (() => {
        dispatch(getAllPokemons())
    },[dispatch])

    useEffect (() => {
        dispatch(getTypes())
    },[dispatch])

    function handleClick(e){
        e.preventDefault(); //para evitar que se recargue la página y no se rompa nada
        dispatch(getAllPokemons());
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderUpFall(e.target.value));
        setCurrentPage(1);
        setOrder(`Organized ${e.target.value}`);
      }



// renderizo
    return (
        <div>
        <Link to= "/newpokemon">Crear Pokemon</Link>
        <h1>POKEMON PI DE LADY</h1>
        <button onClick = { (e) => {handleClick(e)}}>
            Volver a cargar todos los pokemon
        </button>
        <div>
            <select>
                <option value= "asc">Ascendente</option>
                <option value= "desc">Descendente</option>
            </select>
            <select>
                <option></option>
            </select>
{ // me traigo las props del componente Card, como ya me traje el estado global "allPokemons", lo mapeo y le paso la info que necesito mostrar en la card
            allPokemons && allPokemons.map(el => { 
                return (
                    <Link to={"/home/" + el.id}>
                        <Card name={el.name} image={el.img} types={el.types}/> 
                    </Link>
                );
            })
        }
        </div>
        </div>
    )

}



export default Home


// ** cada vez que recargamos, los estados de redux vuelven a cargarse si se tiene un useEffect **