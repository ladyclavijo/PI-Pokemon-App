import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            {/* <div>logo</div> */}

            <div>
            <Link to="/">
                <div>Back</div> 
            </Link>

            <Link to="/newPokemon">
                <div>New Pokemon</div>
            </Link>
            </div>
                
           
        </div>
    )
}
export default NavBar;