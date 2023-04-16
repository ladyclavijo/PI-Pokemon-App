import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";


const PokemonCard = ({ id, name, image, attack, types }) => {

    return (

            <Link className='container_pokemon' to= {`/pokemons/${id}`}> 
            <div className='container_pokemon_card' key={id}>      
              <img className="container_pokemon_card" src={image} alt= {"name"}/>
               <div className="container_pokemon_cardText">
                <p className="container_pokemon_Title">{name}</p>
                <p className="container_pokemon_text">
                    <span className="pokemon_label">Pokemon:</span> {attack}
                    </p>
              </div>
              
               <div>
                 <p key={name}>{name}</p>
                 {types && types.length > 0 && (
                 <ul>
                    {types.map(t => {
                        return(
                            <li key={t.name ? t.name : t}>{t.name ? t.name : t}</li>
                        )
                    })}
                 </ul>
                 )}
              </div>
            </div>
            </Link>
    )
}
export default PokemonCard