import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from 'react-router-dom';
import { getPokemonID, deletePokemon  } from "../../actions/index";

const CardDetail = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const pokemon = useSelector(state => state.pokemons); // ---> el .type de donde lo traigo?
    
    const { name, type, hp, attack, defense, speed, height, weight, createdDB } = pokemon; // REVISAR!!!!!!!!!!!!!!!!!!!!!!!!!!
    let { id } = useParams();
    
    
    useEffect(() => {
        dispatch(getPokemonID(id))
    }, [dispatch, id]);

    
    const handleBack = () => {
        history.goBack();
    }
    
    const handleDelete = (id) => {
        const confirmed = window.confirm(`Are you sure to delete ${name} ?`)
        if (confirmed) {
            dispatch(deletePokemon(id))
            alert(`${name} has been removed`)
            history.push("/home")
        }
    }


    return (
        <div className="container-detail">
            <div className="detail-image">
                <img src={pokemon.image} alt = "no image"/> {/* alt= "No image"   ???? */}               
            </div>
            <div className="detail-info">
              
                <p>Name: {name}</p>
                <p>HP: {hp}</p>
                <p>Attack: {attack}</p>
                <p>Defense: {defense}</p>
                <p>Speed: {speed}</p>
                <p>Height: {height}</p>
                <p>Weight: {weight}</p>
            </div>
            <div>
                <p>Types: </p>
                {type && type.length > 0 && (
                    <ul className="lista">
                        {type?.map(t => {
                            return(
                                <li key={t.name ? t.name : t}>{t.name ? t.name : t}</li>
                            )
                        })}
                    </ul>
                )}
            </div>
        
                {createdDB && <button className="btn-delete" onClick={() => handleDelete(id)}>Delete Pokemon</button>}

                <button onClick={handleBack}>back</button>
        
        </div>
    )
};

export default CardDetail;