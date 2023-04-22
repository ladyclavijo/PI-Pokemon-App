import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemonName } from "../../actions";


export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState(""); // lo que tengo en el estado local "name", va a llegar a mi acción, que va a llamar al backend y le va a pasar lo que tengo en "name" que es lo que está tipeando el usuario

    function handleInput(e) { 
        e.preventDefault();
        setName(e.target.value.toLowerCase());
    }

    function handleButton(e) {
        e.preventDefault();
        const searchPokemon = getPokemonName(name) // name va a ser mi estado local, ahí voy guardando lo que va tipeando el usuario
        dispatch(searchPokemon)
        setName("")
    }
    
    return (
        <div>
            <form>
                <input type="text" 
                   onChange = {(e) => handleInput(e)}
                   placeholder="Search a Pokemon"/>

                <Link to={`/home?name=${name}`}>
                <button type="submit" onClick={(e) => handleButton(e)}>Search</button>
                </Link>
            </form>
        </div>
    )
};