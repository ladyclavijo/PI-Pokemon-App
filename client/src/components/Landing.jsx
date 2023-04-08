import React from "react";
import { Link } from "react-router-dom";




const Landing = () => {
    return(
        <div>
            <h1>Bienvenidos a mi página</h1>
            <Link to="/home">
                <button>Ingresar</button>
            </Link>
        </div>
    );
}


export default Landing;
