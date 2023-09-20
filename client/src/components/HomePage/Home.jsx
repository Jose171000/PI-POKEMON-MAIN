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
    const [filteredTypes, setFilteredTypes] = useState({
        normal: 0,
        fighting: 0,
        flying: 0,
        poison: 0,
        ground: 0,
        rock: 0,
        bug: 0,
        ghost: 0,
        steel: 0,
        fire: 0,
        water: 0,
        grass: 0,
        electric: 0,
        psychic: 0,
        ice: 0,
        dragon: 0,
        dark: 0,
        fairy: 0,
        unknown: 0,
        shadow: 0
    })
    const [imgLoading, setImgLoading] = useState(true)

    const typesCounter = () => {
        const updatedFilteredTypes = {
            normal: 0,
            fighting: 0,
            flying: 0,
            poison: 0,
            ground: 0,
            rock: 0,
            bug: 0,
            ghost: 0,
            steel: 0,
            fire: 0,
            water: 0,
            grass: 0,
            electric: 0,
            psychic: 0,
            ice: 0,
            dragon: 0,
            dark: 0,
            fairy: 0,
            unknown: 0,
            shadow: 0
        }

        allPokemons.forEach(poke => {
            console.log("ando filtrando types");
            const pokeTypes = poke['types'].split(", ")
            pokeTypes.forEach(type => {
                updatedFilteredTypes[type] = (updatedFilteredTypes[type] || 0) + 1;
            })
        })
        console.log(updatedFilteredTypes);
        setFilteredTypes(updatedFilteredTypes)

    }

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

    const handleClick = () => {
        setImgLoading(false)
    }


    const handlePage = (event) => {
        setImgLoading(false)
        event.preventDefault()
        if (event.target.name === "next") {
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage(currentPage - 1)
        }
        handleOptions(event)
        setSelectedOption("types")
    }
    
    useEffect(() => {
        setCurrentPage(currentPage)
        dispatch(getAllPokemons(currentPage))
    }, [currentPage])
    useEffect(() => {
        typesCounter()
        dispatch(filteredFromDB())
        dispatch(filteredFromAPI())
        setImgLoading(true)

    }, [allPokemons])

    return (
        <div>
            <div className={style.menuContainer}>

                <Nav handleClick={handleClick} />
                {showAllToggle ? null : <button onClick={handleShowAllButton} value="SHOW ALL">Show all</button>}

                <button onClick={handleOrder}>{textToggle ? "A-Z" : "Z-A"}</button>
                <button>
                    <select value={selectedOption} onChange={handleOptions}>
                        <option value="SHOW ALL">TYPES</option>
                        <option value="SHOW ALL">SHOW ALL </option>
                        <option value="normal" disabled={!filteredTypes.normal}>normal ({filteredTypes.normal})</option>
                        <option value="fighting" disabled={!filteredTypes.fighting}>fighting ({filteredTypes.fighting})</option>
                        <option value="flying" disabled={!filteredTypes.flying}>flying ({filteredTypes.flying})</option>
                        <option value="poison" disabled={!filteredTypes.poison}>poison ({filteredTypes.poison})</option>
                        <option value="ground" disabled={!filteredTypes.ground}>ground ({filteredTypes.ground})</option>
                        <option value="rock" disabled={!filteredTypes.rock}>rock ({filteredTypes.rock})</option>
                        <option value="bug" disabled={!filteredTypes.bug}>bug ({filteredTypes.bug})</option>
                        <option value="ghost" disabled={!filteredTypes.ghost}>ghost ({filteredTypes.ghost})</option>
                        <option value="steel" disabled={!filteredTypes.steel}>steel ({filteredTypes.steel})</option>
                        <option value="fire" disabled={!filteredTypes.fire}>fire ({filteredTypes.fire})</option>
                        <option value="water" disabled={!filteredTypes.water}>water ({filteredTypes.water})</option>
                        <option value="grass" disabled={!filteredTypes.grass}>grass ({filteredTypes.grass})</option>
                        <option value="electric" disabled={!filteredTypes.electric}>electric ({filteredTypes.electric})</option>
                        <option value="psychic" disabled={!filteredTypes.psychic}>psychic ({filteredTypes.psychic})</option>
                        <option value="ice" disabled={!filteredTypes.ice}>ice ({filteredTypes.ice})</option>
                        <option value="dragon" disabled={!filteredTypes.dragon}>dragon ({filteredTypes.dragon})</option>
                        <option value="dark" disabled={!filteredTypes.dark}>dark ({filteredTypes.dark})</option>
                        <option value="fairy" disabled={!filteredTypes.fairy}>fairy ({filteredTypes.fairy})</option>
                        <option value="unknown" disabled={!filteredTypes.unknown}>unknown ({filteredTypes.unknown})</option>
                        <option value="shadow" disabled={!filteredTypes.shadow}>shadow ({filteredTypes.shadow})</option>

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
                    <button name="next" value="SHOW ALL" onClick={handlePage} >NEXT PAGE</button>
                </div>
            </div>
            <div className={style.cardsContainer}>

                {showAllToggle ? <Cards
                    pokemons={toggle ? allPokemons : pokeFiltered}
                /> :
                    <Cards pokemons={toggle ? filterByOrigin : pokeFiltered} />}
                {
                    imgLoading ?
                        null : <div className={style.imgLoading}> <img src="https://www.wpfaster.org/wp-content/uploads/2013/06/loading-gif.gif" alt="charging image" /></div>}
            </div>
            <div className={style.pagingBottom}>

                <button name="previous" value="SHOW ALL" onClick={handlePage} disabled={currentPage < 1}>PREVIOUS PAGE</button>
                <h3 className={style.currentPage}>{currentPage + 1}</h3>
                <button name="next" value="SHOW ALL" onClick={handlePage}>NEXT PAGE</button>
            </div>
        </div>
    )
}