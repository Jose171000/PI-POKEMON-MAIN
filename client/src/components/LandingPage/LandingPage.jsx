import { Link } from 'react-router-dom'
import { getAllPokemons } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

export default function LandingPage() {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllPokemons())
    },[])

    return (
        <div>
            <Link to="/home">
                <button>HOME</button>
            </Link>
        </div>
    )
}