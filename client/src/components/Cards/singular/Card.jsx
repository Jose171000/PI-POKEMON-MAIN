import { Link } from 'react-router-dom'
import style from './Card.module.css'
export default function Card({pokemon}) {
    return (
        <Link to={`/detail/${pokemon?.id}`}>
        <div className={style.card}>
            <div style={{"backgroundColor":"red"}}>
            <h2>{pokemon?.name}</h2>
            <img src={pokemon.image} alt="ourPokemon" className={style.img}/>
            <h3>{pokemon?.id}</h3>
            <h3>{pokemon?.height} cm</h3>
            <h3>{pokemon?.weight} cm</h3>
            <h3>{pokemon?.types}</h3>
            </div>
        </div>
        </Link>
    )
}