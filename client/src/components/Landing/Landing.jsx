import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";



const Landing = () => {
    return(
        <div className="landing-container">
            <h1 className="landing-header">WELCOME TO MY PROJECT!</h1>
            <Link to="/home">
                <button className="landing-button">Let's get started</button>
            </Link>
        </div>
    );
}

export default Landing;