import { Link } from 'react-router-dom'
import style from './Card.module.css'
import { deletePokemon } from '../../../redux/actions'
import { useDispatch } from 'react-redux'
export default function Card({pokemon}) {
    const dispatch = useDispatch();

    const closeButton = (event)=>{
        event.preventDefault();
        dispatch(deletePokemon(pokemon?.id))
    }

    return (
        <Link to={`/detail/${pokemon?.id}`}>
        <div className={style.cardContainer}>
            <button className={style.closeButton} onClick={closeButton}>x</button>
            <div className={style.card}>
            <h2 className={style.name}>{pokemon?.name}</h2>
            <h3 style={{"display":"none"}}>{pokemon?.id}</h3>
            <h3 style={{"display":"none"}}>{pokemon?.height} cm</h3>
            <h3 style={{"display":"none"}}>{pokemon?.weight} cm</h3>
            <h3 className={style.types}>{pokemon?.types}</h3>
            </div>
            <img src={pokemon.image} alt="ourPokemon" className={style.img}/>
        </div>
        </Link>
    )
}