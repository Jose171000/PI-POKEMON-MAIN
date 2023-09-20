import { useState } from "react"
import style from "./Form.module.css"
import { useDispatch } from "react-redux"
import { postPokemon } from "../../redux/actions"
import { Link } from "react-router-dom"
import validation from "./validation"

export default function Form() {
    const dispatch = useDispatch()
    const [plusToggle, setPlusToggle] = useState(true)
    const [messageToggle, setMessageToggle] = useState(true)
    const [types, setTypes] = useState({
        types: "",
        types2: ""
    })
    const [pokeData, setPokeData] = useState({
        name: "",
        image: "",
        life: "",
        attack: "",
        defense: "",
        velocity: "",
        height:"",
        weight:""
    })
    const [error, setError] = useState({
        name: "",
        image: "",
        life: "",
        attack: "",
        defense: "",
        velocity: "",
        height:"",
        weight:""
    })


    const handleChange = (event) => {
        const input = event.target
        setPokeData({
            ...pokeData,
            [input.name]: input.value
        })
        setError(validation({
            ...pokeData,
            [input.name]: input.value
        }))
    }

    const handleTypes = (event) => {
        setTypes({
            ...types,
            [event.target.name]: event.target.value
        })
        console.log(types);
    }

    const createPokemon = (event) => {
        event.preventDefault()
        if (types.types2) {
            dispatch(postPokemon({ ...pokeData, types: [types.types, types.types2] }))
        } else {
            dispatch(postPokemon({ ...pokeData, types: [types.types] }))
        }
        clearAll(event)
    }

    const handlePlusButton = (event) => {
        event.preventDefault()
        setPlusToggle(false)
    }

    const handleLessButton = (event) => {
        event.preventDefault()
        setPlusToggle(true)
        setTypes({
            ...types,
            types2: ""
        })
    }

    const clearAll = (event) => {
        event.preventDefault()
        setError({
            name: "",
            image: "",
            life: "",
            attack: "",
            defense: "",
            velocity: "",
            height:"",
            weight:""
        })
        setPokeData({
            name: "",
            image: "",
            life: "",
            attack: "",
            defense: "",
            velocity: "",
            height:"",
            weight:""
        })
        setTypes({
            types: "",
            types2: ""
        })
        setPlusToggle(true)
    }


    return (
        <form onSubmit={createPokemon} className={style.form}>
            <h2>Please, write in each item</h2>
            <div className={style.eachItem}>
                <label htmlFor="name">name</label>
                <input type="text" name="name" value={pokeData.name} onChange={handleChange} />
            </div>
            {error.name && <p>{error.name}</p>}
            <div className={style.eachItem}>
                <label htmlFor="image">imagen</label>
                <input type="text" name="image" value={pokeData.image} onChange={handleChange} />
            </div>
            {pokeData.image.length>255 && <p>The image link must be under 255 characters. Please, choose another image link</p>}
            {error.image && <p>{error.image}</p>}
            <div className={style.eachItem}>
                <label htmlFor="life">life</label>
                <input type="text" name="life" value={pokeData.life} onChange={handleChange} />
            </div>
            {error.life && <p>{error.life}</p>}
            <div className={style.eachItem}>
                <label htmlFor="attack">attack</label>
                <input type="text" name="attack" value={pokeData.attack} onChange={handleChange} />
            </div>
            {error.attack && <p>{error.attack}</p>}
            <div className={style.eachItem}>
                <label htmlFor="defense">defense</label>
                <input type="text" name="defense" value={pokeData.defense} onChange={handleChange} />
            </div>
            {error.defense && <p>{error.defense}</p>}
            <div>
                <label htmlFor="velocity">velocity</label>
                <input type="text" name="velocity" value={pokeData.velocity} onChange={handleChange}/>
            </div>
            {error.velocity && <p>{error.velocity}</p>}
            <div>
                <label htmlFor="height">height</label>
                <input type="text" name="height" value={pokeData.height} onChange={handleChange}/>
            </div>
            {error.height && <p>{error.height}</p>}
            <div>
                <label htmlFor="weight">weight</label>
                <input type="text" name="weight"  value={pokeData.weight} onChange={handleChange}/>
            </div>
            {error.weight && <p>{error.weight}</p>}
            <div className={style.eachItem}>
                <label htmlFor="types">types</label>
                <select name="types" onChange={handleTypes} value={types.types}>
                    <option value="allTypes">All types</option>
                    <option value="normal">normal</option>
                    <option value="fighting">fighting</option>
                    <option value="flying">flying</option>
                    <option value="poison">poison</option>
                    <option value="ground">ground</option>
                    <option value="rock">rock</option>
                    <option value="bug">bug</option>
                    <option value="ghost">ghost</option>
                    <option value="steel">steel</option>
                    <option value="fire">fire</option>
                    <option value="water">water</option>
                    <option value="grass">grass</option>
                    <option value="electric">electric</option>
                    <option value="psychic">psychic</option>
                    <option value="ice">ice</option>
                    <option value="dragon">dragon</option>
                    <option value="dark">dark</option>
                    <option value="fairy">fairy</option>
                    <option value="unknown">unknown</option>
                    <option value="shadow">shadow</option>
                </select>
                {
                    plusToggle ? <button onClick={handlePlusButton} disabled={types.types === "" || types.types === "allTypes"}>+</button> :
                        <select name="types2" onChange={handleTypes} value={types.types2}>
                            <option value="allTypes">All types</option>
                            <option value="normal">normal</option>
                            <option value="fighting">fighting</option>
                            <option value="flying">flying</option>
                            <option value="poison">poison</option>
                            <option value="ground">ground</option>
                            <option value="rock">rock</option>
                            <option value="bug">bug</option>
                            <option value="ghost">ghost</option>
                            <option value="steel">steel</option>
                            <option value="fire">fire</option>
                            <option value="water">water</option>
                            <option value="grass">grass</option>
                            <option value="electric">electric</option>
                            <option value="psychic">psychic</option>
                            <option value="ice">ice</option>
                            <option value="dragon">dragon</option>
                            <option value="dark">dark</option>
                            <option value="fairy">fairy</option>
                            <option value="unknown">unknown</option>
                            <option value="shadow">shadow</option>
                        </select>
                }
                {
                    plusToggle ? null : <button onClick={handleLessButton}>-</button>
                }
            </div>
            {!plusToggle && types.types2 === "" && <p>You should change the default option or push less button (-)</p>}
            {!plusToggle && types.types === types.types2 && <p>Please, each option type must be different</p>}
            {types.types === "allTypes" && <p>You must change the option 'All types'</p>}
            {types.types2 === "allTypes" && <p>You must change the option 'All types'</p>}
            <div className={style.buttonContainer}>
            <button disabled={error.name || !pokeData.name || error.image || !pokeData.image || error.life || !pokeData.life || error.attack || !pokeData.attack || error.defense || !pokeData.defense || !types.types || types.types === "allTypes" || types.types2 === "allTypes" || types.types === types.types2 ||pokeData.image.length>255 || error.velocity || error.height || error.weight}>CREATE</button>
            <button disabled={!pokeData.name && !pokeData.image && !pokeData.life && !pokeData.attack && !pokeData.defense && !types.types && !pokeData.velocity && !pokeData.height && !pokeData.weight} onClick={clearAll}>Clear All</button>
            </div>
            <Link to="/home">
                <button>back to Home</button>
            </Link>

        </form>
    )
}