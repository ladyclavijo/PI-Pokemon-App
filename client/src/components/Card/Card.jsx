import React from "react";
// import { Link } from "react-router-dom";
import "./card.css";
import { GiCornerExplosion } from 'react-icons/gi';

const PokemonCard = ({ id, name, image, attack, type }) => {

    return (
 
            <div className='container-card'>     

              <div className="container-image">
              <img className="container-image__img" src={image} alt= "buscar imagen"/>
              <div className= "attack-div">
                <GiCornerExplosion/> {attack} {/* FALTA AGREGAR ICONO DEL ATTACK */}
              </div>
              </div>


               
                <div className="container-info">
                <p className="container-info__title" key={id}>{name}</p>                
                </div>

                


               <div className="types-div">
                 <p>Types: </p>
                 {type && type.length > 0 && (
                 <ul className="list">
                    {type.map(t => {
                        return(
                            <li key={t.name ? t.name : t}>{t.name ? t.name : t}</li>
                        )
                    })}
                 </ul>
                 )}
              </div>

            </div>
    )
}
export default PokemonCard