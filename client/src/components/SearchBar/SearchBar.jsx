import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPokemonByName } from "../../redux/actions";
import style from "./SearchBar.module.css"

export default function SearchBar({handleClick}) {
    const [name, setName] = useState('');
    const [loadingToggle, setLoadingToggle] = useState(true)
    const [checkToggle, setCheckToggle] = useState(true)
    const dispatch = useDispatch();
    const allPokemons = useSelector(state=>state.allPokemons)

    const handlerChange = (event) => {
        const value = event.target.value
        setName(value)
    }
    const onClick = (name)=>{
        dispatch(getPokemonByName(name));
        setLoadingToggle(false)
        handleClick()
    }
    useEffect(()=>{
        if(loadingToggle === true){
            setCheckToggle(false)
        }
        setTimeout(() => {
            setCheckToggle(true)
        }, 1000);
    },[allPokemons, loadingToggle])
    useEffect(()=>{
        setLoadingToggle(true)
        setName('')
    }, [allPokemons])
    return (
        <div className={style.divSearchBar}>
            { loadingToggle? null:<img className={style.loadingImg} src="https://www.wpfaster.org/wp-content/uploads/2013/06/loading-gif.gif" alt="charging Image"/> }
            {checkToggle?null:<img className={style.check} src="https://www.freeiconspng.com/uploads/check-mark-clipart-transparent-19.png" alt="check"/>}
            <input type="text" onChange={handlerChange} value={name}/>
            <button onClick={()=>onClick(name)} disabled={name===""}>search pokemon</button>
        </div>
    )
}