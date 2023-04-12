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
        
}


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
        type: [], // ***************** faltan las "" ???
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weigth: ""
    })

    const pokemonsCheck = pokemons.map(e => e.name);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    
    setError(validate({
        ...input,
        [e.target.name]: e.target.value,
    }, pokemonsCheck));

    };

    const handleTypes = (e) => {
        const selectedType = e.target.value;

        if(!input.types.includes(selectedType)) {
            setInput({
                ...input,
                types: [...input.types, selectedType]
            })

            setError(validate({
                ...input,
                types: [...input.types, selectedType]
            }, pokemonsCheck));
        }
    };

    const handleDelete = (type) => {
        setInput({
            ...input,
            types: input.types.filter(t => t !== type)
        })

        setError(validate({
            ...input,
            types: input.types.filter(t => t !== type)
        }, pokemonsCheck));       
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(error).length === 0) {
            dispatch(newPokemon(input));

            alert("¡Your Pokemon has been created successfully!")
            setInput({
                name: "",
                hp: "",
                image: "",
                type: [], // ***************** faltan las "" ???
                attack: "",
                defense: "",
                speed: "",
                height: "",
                weigth: ""
            })
            history.push("/home") // --------------- !!!!!!!!!!   
        } else {
            alert("Please complete the options")
        }
    };


    return (

        <div>

            <h1>Create your Pokemon!</h1>

            <div>
            <label>Name:</label>
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
            </div>


                <div>
                <label>HP:</label>
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


            
            <div>
                <label>Attack:</label>
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

            <div>
                <label>Defense:</label>
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


            <div>
                <label>Speed:</label>
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


            <div>
                <label>Height:</label>
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


            <div>
                <label>Weight:</label>
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


            <div>
            {types.map((t, k) => (
              <div key={k}>
                <input
                  type="checkbox"
                  name={t.name}
                  key={k}
                  value={t.name}
                  onChange={(e) => handleTypes(e)}
                />
                <label>{t.name}</label>
              </div>
            ))}
          </div>
          <p>{error.type}</p>


  


            <div>
              <button>Create</button>
            </div>


            <div>
              <Link to="/home"><button>Go Home</button></Link>
            </div>


        </div>

               
    )
}
export default Form;