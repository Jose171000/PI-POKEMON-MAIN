import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function PokeDetail (){
    const {id} = useParams()
    const onePoke = useSelector(state=>state.pokemons).find(pokemon=>pokemon.id === Number(id))
    const [poke, setPoke] = useState({...onePoke})
    
    useEffect(()=>{
   
        return(()=>{
            setPoke({})
        })

    },[])
    return(
        <div>
            <Link to="/home">
            <button>Back to hom</button>
            </Link>
            <h1>{id}</h1>
            <h1>{poke?.name}</h1>
            <img src={poke?.image} alt="our picture" />
            <h1>{poke?.types}</h1>
        </div>
    )
}