import { useState } from "react"
import style from "./Form.module.css"
import { useDispatch } from "react-redux"
import { postPokemon } from "../../redux/actions"
import { Link } from "react-router-dom"

export default function Form() {
    const dispatch = useDispatch()
    const [pokeData, setPokeData] = useState({
        name: "",
        image: "",
        life: "",
        attack: "",
        defense: "",
        types: ""
    })
    const handleChange = (event) => {
        const input = event.target
        setPokeData({
            ...pokeData,
            [input.name]: input.value
        })
    }
    const createPokemon = (event) => {
        event.preventDefault()
        dispatch(postPokemon(pokeData))
    }

    return (
        <form onSubmit={createPokemon} className={style.form}>
            <h2>Please, write in each item</h2>
            <div className={style.eachItem}>
                <label htmlFor="name">name</label>
                <input type="text" name="name" value={pokeData.name} onChange={handleChange} />
            </div>
            <div className={style.eachItem}>
                <label htmlFor="image">imagen</label>
                <input type="text" name="image" value={pokeData.image} onChange={handleChange} />
            </div>
            <div className={style.eachItem}>
                <label htmlFor="life">life</label>
                <input type="text" name="life" value={pokeData.life} onChange={handleChange} />
            </div>
            <div className={style.eachItem}>
                <label htmlFor="attack">attack</label>
                <input type="text" name="attack" value={pokeData.attack} onChange={handleChange} />
            </div>
            <div className={style.eachItem}>
                <label htmlFor="defense">defense</label>
                <input type="text" name="defense" value={pokeData.defense} onChange={handleChange} />
            </div>
            <div className={style.eachItem}>
                <label htmlFor="types">types</label>
                <input type="text" name="types" value={pokeData.types} onChange={handleChange} />
            </div>
            <button>CREATE</button>
            <Link to="/home">
            <button>back to Home</button>
            </Link>

        </form>
    )
}