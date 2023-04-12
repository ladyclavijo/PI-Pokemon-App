import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <div>logo</div>

            <div>
            <Link to="/home">
                <div>Home</div>
            </Link>

            <Link to="/newPokemon">
                <div>New Pokemon</div>
            </Link>
            </div>
                
            <div>
                <SearchBar/>
            </div>

        </div>


    )
}

export default NavBar;