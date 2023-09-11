import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getAllTypes } from '../../redux/actions'
import { useDispatch } from 'react-redux'

export default function LandingPage() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllTypes())
    },[])
    return (
        <div>
            <Link to="/home">
                <button>HOME</button>
            </Link>
        </div>
    )
}