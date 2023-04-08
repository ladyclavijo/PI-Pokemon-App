import React from "react";



const PokemonCard = ({ image, name, types }) => {

    return (
        <div>
        <h3>{name}</h3>
        <h5>{types}</h5>
        <img src={image} alt= "Image not found" width="200px" height="250px"/>
        </div>
    
    )
}


export default PokemonCard