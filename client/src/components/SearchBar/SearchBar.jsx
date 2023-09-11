import { useState } from "react"
import { useDispatch } from "react-redux"
import { getPokemonByName } from "../../redux/actions";
export default function SearchBar() {
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const handlerChange = (event) => {
        const value = event.target.value
        setName(value)
    }
    const onClick = (name)=>{
        dispatch(getPokemonByName(name));
    }
    return (
        <div>
            <input type="text" onChange={handlerChange} value={name}/>
            <button onClick={()=>onClick(name)}>search pokemon</button>
        </div>
    )
}