import { useState } from "react"
import { useDispatch } from "react-redux"
import { getPokemonByName } from "../../redux/actions";
import style from "./SearchBar.module.css"
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
        <div className={style.divSearchBar}>
            <input type="text" onChange={handlerChange} value={name}/>
            <button onClick={()=>onClick(name)}>search pokemon</button>
        </div>
    )
}