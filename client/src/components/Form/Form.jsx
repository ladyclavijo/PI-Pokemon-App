import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getAllPokemons, getAllTypes, newPokemon } from "../../actions";


const validate = (input) => {
    let errors = {};

    if(!input.name) {
        errors.name = "Name must be completed"
    }

    if (!input.types.length) {
        errors.types = "Insert at least one type"
    }

    if(!input.image) {
        errors.image = "Image is required"
    }

    if(!input.hp) {
        errors.hp = "HP is required"
    }

    if(!input.attack) {
        errors.attack = "Attack is required"
    }

    if(!input.defense) {
        errors.defense = "Defense is required"
    }
        
    return errors;
        
};


const Form = () => {

    const dispatch = useDispatch();
    const history  = useHistory();
    const pokemons = useSelector(state => state.pokemons);
    const types    = useSelector(state => state.types);

    const [error, setError] = useState({});

    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getAllTypes());
    }, [dispatch])

    const [input, setInput] = useState({
        name: "",
        hp: "",
        image: "",
        type: [],
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weigth: ""
    });

    const pokemonsCheck = pokemons.map(e => e.name);

    const handleChange = (e) => { //cada vez que se ejecute esta funcion, a mi estado input además de lo q tiene, agregale el target value de lo q esté modificando
        
        setInput({
            ...input,
            [e.target.name]: e.target.value, 
        });
    
    setError(validate({
        ...input,
        [e.target.name]: e.target.value,
    }, pokemonsCheck));

    };

    const handleSelect = (e) => {
        setInput({
            ...input,
            types: [...input.type, e.target.value]
        })
    };

    const handleDelete = (pokemon) => {
        setInput({
            ...input,
            pokemons: input.pokemons.filter(p => p !== pokemon)
        })

        setError(validate({
            ...input,
            pokemons: input.pokemons.filter(t => t !== pokemon)
        }, pokemonsCheck));       
    };

    const handleSubmit = (e) => {
        e.preventDefault();

            dispatch(newPokemon(input));

            alert("¡Your Pokemon has been created successfully!")
            setInput({
                name: "",
                hp: "",
                image: "",
                type: [], 
                attack: "",
                defense: "",
                speed: "",
                height: "",
                weigth: ""
            })
            history.push("/home")   
        };
    

    //aquí abajo los target value que va agarrando mi funcion "handleChange"
    return(

        <div>

            <h1 className="tittle">Create your Pokemon!</h1>

            <div className="container-form">
                <form onSubmit={handleSubmit}>

            <div className="form-input">
             <label className="form-label">Name: </label>
                <input type='text'
                       value={input.name}
                       name='name'
                       autoComplete='off'
                       placeholder='Enter a name'
                       onChange={handleChange}/>
                {
                    error.name && (
                        <p>{error.name}</p>
                    )
                }
            </div>

{/* 
            <div>
                <label>Image:</label>
                <input
                    type="text"
                    name="image"
                    value={input.image}
                    placeholder="Enter a image"
                  //   autoComplete="off"
                    onChange={(e) => handleChange(e)}
                  />
            <p>{error.image}</p>
            </div> */}


                <div className="form-input">
                <label className="form-label">HP:</label>
                <input value={input.hp}
                       type="number" 
                       name='summary'
                       autoComplete='off'
                       placeholder='0'
                       onChange={handleChange}/>
              {
                      error.hp && (
                          <p>{error.hp}</p>
                      )
                  }
                </div>


            
            <div className="form-input">
                <label className="form-label">Attack:</label>
                <input
                    type="number"
                    name="attack"
                    value={input.attack}
                    placeholder="0"
                    autoComplete="off"
                    onChange={(e) => handleChange(e)}/>
                {
                    error.attack && (
                        <p>{error.attack}</p>
                    )
                }
            </div>


            <div className="form-input">
                <label className="form-label">Defense:</label>
                <input
                    type="number"
                    name="defense"
                    value={input.defense}
                    placeholder="0"
                    autoComplete="off"
                    onChange={(e) => handleChange(e)}/>
                {
                    error.defense && (
                        <p>{error.defense}</p>
                    )
                }
            </div>


            <div className="form-input">
                <label className="form-label">Speed:</label>
                <input
                    type="number"
                    name="speed"
                    value={input.speed}
                    placeholder="0"
                    autoComplete="off"
                    onChange={(e) => handleChange(e)}/>
                {
                    error.speed && (
                        <p>{error.speed}</p>
                    )
                }
            </div>


            <div className="form-input">
                <label className="form-label">Height:</label>
                <input
                    type="number"
                    name="height"
                    value={input.height}
                    placeholder="0"
                    autoComplete="off"
                    onChange={(e) => handleChange(e)}/>
                {
                    error.height && (
                        <p>{error.height}</p>
                    )
                }
            </div>


            <div className="form-input">
                <label className="form-label">Weight:</label>
                <input
                    type="number"
                    name="weight"
                    value={input.weight}
                    placeholder="0"
                    autoComplete="off"
                    onChange={(e) => handleChange(e)}/>
                {
                    error.weight && (
                        <p>{error.weight}</p>
                    )
                }
            </div>


            <div className="form-input">
                <label className="form-label">Type: </label>
                <select name= "types" onChange={handleSelect}>
                    <option hidden value="default">Select a Type</option>
                {types.map((t) => (
                    <option value={t.name}>{t.name}</option>
                ))}
                </select>

                <div className='types-select'>
                {input.type.map((type, index) => (
                 <div className='form-types_delete' key={index}>{type}
                   <button onClick={() => handleDelete(type)}>x</button>
                 </div>
            ))}
                </div>               
            </div>
          
            </form>
          
            <Link to="/home"><button>Go Home</button></Link>

            </div>

        </div>               
    )
}
export default Form;