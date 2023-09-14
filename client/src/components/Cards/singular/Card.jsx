import { Link } from 'react-router-dom'
import style from './Card.module.css'
export default function Card({pokemon}) {
    return (
        <Link to={`/detail/${pokemon?.id}`}>
        <div className={style.cardContainer}>
            <div className={style.card}>
            <h2 className={style.name}>{pokemon?.name}</h2>
            <h3 style={{"display":"none"}}>{pokemon?.id}</h3>
            <h3 style={{"display":"none"}}>{pokemon?.height} cm</h3>
            <h3 style={{"display":"none"}}>{pokemon?.weight} cm</h3>
            <h3 style={{"display":"none"}}>{pokemon?.types}</h3>
            </div>
            <img src={pokemon.image} alt="ourPokemon" className={style.img}/>
        </div>
        </Link>
    )
}