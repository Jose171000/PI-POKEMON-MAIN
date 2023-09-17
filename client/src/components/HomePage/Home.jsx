import Cards from "../Cards/plural/Cards"
import Nav from "../Nav/Nav"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPokemons, filteredFromAPI, filteredFromDB, deletePokemon } from "../../redux/actions"
import style from "./Home.module.css"


export default function HomePage() {
    const filterByOrigin = useSelector(state => state.filterByOrigin)
    const allPokemons = useSelector(state => state.allPokemons);
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(0)
    const [textToggle, setTextToggle] = useState(true);
    const [selectedOption, setSelectedOption] = useState('')
    const [pokeFiltered, setPokeFiltered] = useState([])
    const [toggle, setToggle] = useState(true)
    const [showAllToggle, setShowAllToggle] = useState(true)

    const handleShowAllButton = (event) => {
        event.preventDefault()
        handleOptions(event)
        setSelectedOption("types")
        setShowAllToggle(true)
    }


    const filterAPI = (event) => {
        event.preventDefault()
        handleOptions(event)
        setSelectedOption("types")
        dispatch(filteredFromAPI())
        setShowAllToggle(false)
    }

    const filterDB = (event) => {
        event.preventDefault()
        console.log(event.target.value);
        handleOptions(event)
        setSelectedOption("types")
        dispatch(filteredFromDB())
        setShowAllToggle(false)
    }

    const handleOrder = (event) => {
        event.preventDefault()
        if (showAllToggle) {
            if (textToggle) {
                allPokemons.sort((a, b) => a.name.localeCompare(b.name))
            } else {
                allPokemons.sort((a, b) => b.name.localeCompare(a.name))
            }
        } else {
            if (textToggle) {
                filterByOrigin.sort((a, b) => a.name.localeCompare(b.name))
            } else {
                filterByOrigin.sort((a, b) => b.name.localeCompare(a.name))
            }
        }
        setTextToggle(!textToggle)

    }

    const handleOptions = (event) => {
        const option = event.target.value;
        setSelectedOption(option)

        if (option === "SHOW ALL") return setToggle(true);

        console.log(selectedOption);

        const allFilteredPoke = showAllToggle ? allPokemons.filter((poke) => {
            console.log("estoy filtrando lo que viene de Allpoke");
            const type = poke.types?.split(', ').map(word => word.trim());
            return type.includes(option)
        }) :
            filterByOrigin.filter((poke) => {
                console.log("estoy filtrando lo que viene de Allpoke");
                const type = poke.types?.split(', ').map(word => word.trim());
                return type.includes(option)
            })
        setToggle(false)
        setPokeFiltered(allFilteredPoke)
        // console.log(filteredPoke);
        // setFewPokemons(filteredPoke);

    }


    const handlePage = (event) => {
        event.preventDefault()
        if (event.target.name === "next") {
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage(currentPage - 1)
        }
        handleOptions(event)
        setSelectedOption("types")
        console.log(currentPage);
    }
    useEffect(()=>{
        dispatch(filteredFromAPI())
    },[allPokemons])
    useEffect(() => {
        setCurrentPage(currentPage)
        dispatch(getAllPokemons(currentPage))
    }, [currentPage])

    return (
        <div>
            <div className={style.menuContainer}>

                <Nav />
                {showAllToggle ? null : <button onClick={handleShowAllButton} value="SHOW ALL">Show all</button>}

                <button onClick={handleOrder}>{textToggle ? "A-Z" : "Z-A"}</button>
                <button>
                    <select value={selectedOption} onChange={handleOptions}>
                        <option value="">TYPES</option>
                        <option value="SHOW ALL">SHOW ALL</option>
                        <option value="normal">normal</option>
                        <option value="fighting">fighting</option>
                        <option value="flying">flying</option>
                        <option value="poison">poison</option>
                        <option value="ground">ground</option>
                        <option value="rock">rock</option>
                        <option value="bug">bug</option>
                        <option value="ghost">ghost</option>
                        <option value="steel">steel</option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                        <option value="grass">grass</option>
                        <option value="electric">electric</option>
                        <option value="psychic">psychic</option>
                        <option value="ice">ice</option>
                        <option value="dragon">dragon</option>
                        <option value="dark">dark</option>
                        <option value="fairy">fairy</option>
                        <option value="unknown">unknown</option>
                        <option value="shadow">shadow</option>

                    </select>
                </button>
                <button value="SHOW ALL" onClick={filterAPI}>All from external API</button>
                <button value="SHOW ALL" onClick={filterDB}>All from DB</button>
                <Link to="/form">
                    <button>CREATE POKEMON</button>
                </Link>
                <div className={style.paging}>
                    <button name="previous" value="SHOW ALL" onClick={handlePage} disabled={currentPage < 1}>PREVIOUS PAGE</button>
                    <h3 className={style.currentPage}>{currentPage + 1}</h3>
                    <button name="next" value="SHOW ALL"  onClick={handlePage} >NEXT PAGE</button>
                </div>
            </div>
            {showAllToggle ? <Cards
                pokemons={toggle ? allPokemons : pokeFiltered}
            /> :
                <Cards pokemons={toggle ? filterByOrigin : pokeFiltered} />}
            <div className={style.pagingBottom}>

                <button name="previous" value="SHOW ALL" onClick={handlePage} disabled={currentPage < 1}>PREVIOUS PAGE</button>
                <h3 className={style.currentPage}>{currentPage + 1}</h3>
                <button name="next" value="SHOW ALL" onClick={handlePage} >NEXT PAGE</button>
            </div>
        </div>
    )
}