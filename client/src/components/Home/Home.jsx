import "./home.css";

import React from "react";
import { useState, useEffect } from "react"; // importo los hooks que uso de react
import { useDispatch, useSelector } from "react-redux"; // importo los hooks de react-redux
import { getAllPokemons, getAllTypes, filterByTypes, createPokemon, orderByAttack, orderByName } from "../../actions"; // importo las actions que quiero usar en "Home"
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

//importo los components necesarios
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";



function Home() {

    const dispatch = useDispatch(); //es para utilizar esta cte e ir despachando mis acciones
    const history = useHistory();

    const pokemons = useSelector ((state) => state.pokemons); //me trae del reducer el estado "pokemons"  
    const types = useSelector ((state) => state.types);
    
    const [order, setOrder] = useState(""); // estado local que arranca vacío

    const [currentPage, setCurrentPage] = useState(1); //declaro un estado local en el que le paso la pág actual que va a arrancar en 1 y cuál será la pág actual
    
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12); // declaro otro estado local
    
    const indexOfLastPokemon = currentPage * pokemonsPerPage; // 1 * 12 = 12    3 * 12 = 36
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // 12 - 12 = 0       36 - 12 = 24
    
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    // [0, 11] --> me muestra 12 
    // [12, 23] ---> me muestra 12
    // [24, 35] ---> me muestra 12

    // "pagination" para actualizar el estado de la aplicación al cambiar la pág actual
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    };
    
   
    useEffect (() => {
        dispatch(getAllPokemons())
        dispatch(getAllTypes())
    },[dispatch]);


   
    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1)
        setOrder(`Organized ${e.target.value}`) // al estado local que arranca vacío, lo seteo ordenado de tal forma
    }

    function handleSortAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1)
        setOrder(`Organized ${e.target.value}`)
    }

    function handleFilterTypes(e) {
        e.preventDefault();
        dispatch(filterByTypes(e.target.value));
        setCurrentPage(1)
        setOrder(`Organized ${e.target.value}`)
    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(createPokemon(e.target.value));
        setCurrentPage(1)
        setOrder(`Organized ${e.target.value}`)
    }

    function handleButton() {
        history.go(0)
    }

// renderizo
    return (
        <div>

            <div>
                <NavBar/>
            </div>
        
        <div>

            <select onChange={handleSort}>
                <option value= "default" hidden>Order By Name</option>
                <option value= "asc">A - Z</option>
                <option value= "desc">Z - A</option>
            </select>
            
            <select onChange={handleSortAttack}>
                <option value= "default" hidden>Order By Attack</option>
                <option value= "attackAsc" >Attack asc</option>
                <option value= "attackDesc">Attack desc</option>
            </select>
                     
            <select onChange={handleFilterCreated}>
                <option value= "default" hidden>Order By Source</option>
                <option value= "all">All Pokemons</option>
                <option value= "createdDB">Pokemons Created</option>
                <option value= "eApi">Pokemons Api</option>
            </select>

            <select onChange={handleFilterTypes}>
                <option value= "all" hidden>All Types</option>
                    {types?.map((t) => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
            </select>

            <button onClick={e => handleButton(e)}>Clear</button>
            
        </div>

            <div>
                <SearchBar/>
            </div>

        <div>
            <Pagination 
                pokemonsPerPage={pokemonsPerPage}
                pokemons={pokemons.length}
                pagination={pagination}
            /> 



           {currentPokemons?.map((el) => { // me traigo las props del componente Card, como ya me traje el estado global "allPokemons", lo mapeo y le paso la info que necesito mostrar en la card

           // el img de dónde viene?? 
           //al el le aplico la image que viene del back
               return (
                   <div>
                   <Link to={`/detail/${el.id}`}>
                       <Card name={el.name} image={el.image} types={el.type} attack={el.attack}/> {/*lo paso por props al el*/}
                   </Link>
                   </div>
               );
           })}

        </div>

        </div>
    )
}
export default Home
// ** cada vez que recargamos, los estados de redux vuelven a cargarse si se tiene un useEffect **