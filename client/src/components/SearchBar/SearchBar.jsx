import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchName } from "../../actions";
import { Link } from "react-router-dom";


export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInput(e) {
        e.preventDefault();
        setName(e.target.value.toLowerCase());
    }

    function handleButton(e) {
        e.preventDefault();
        const searchPokemon = searchName(name)
        dispatch(searchPokemon)
        setName("")
    }
    
    return (
        <div>
            <form>
                <input type="text" 
                   onChange={handleInput}
                placeholder="Search a Pokemon"/>

                <Link to={`/home?name=${name}`}>
                <button onClick={e => handleButton(e)}>Search</button>
                </Link>
            </form>
        </div>
    )
};