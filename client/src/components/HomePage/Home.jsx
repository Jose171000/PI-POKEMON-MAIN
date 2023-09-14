import Cards from "../Cards/plural/Cards"
import Nav from "../Nav/Nav"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPokemons } from "../../redux/actions"
import style from "./Home.module.css"


export default function HomePage() {
    const pokemons = useSelector(state => state.pokemons)
    const allPokemons = useSelector(state => state.allPokemons);
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(0)
    const [textToggle, setTextToggle] = useState(true);
    const [selectedOption, setSelectedOption] = useState('')
    const [fewPokemons, setFewPokemons] = useState([])
    const [pokeFiltered, setPokeFiltered] = useState([])
    const [toggle, setToggle] = useState(true)


    const handleOrder = (event) => {
        console.log(event.target)
        if (textToggle) {
            console.log(pokemons);
            pokemons.sort((a, b) => a.name.localeCompare(b.name))
            allPokemons.sort((a, b) => a.name.localeCompare(b.name))
            console.log(pokemons);
        } else {
            pokemons.sort((a, b) => b.name.localeCompare(a.name))
            allPokemons.sort((a, b) => b.name.localeCompare(a.name))
            console.log(pokemons);
        }
        setTextToggle(!textToggle)

    }

    const handleOptions = (event) => {
        const option = event.target.value;
        setSelectedOption(option)

        if (option === "SHOW ALL") return setToggle(true);

        console.log(selectedOption);

        const filteredPoke = pokemons.filter((poke) => {
            const type = poke.types.split(', ').map(word => word.trim());
            return type.includes(option)
        })
        const allFilteredPoke = allPokemons.filter((poke) => {
            console.log("estoy filtrando lo que viene de Allpoke");
            const type = poke.types.split(', ').map(word => word.trim());
            return type.includes(option)
        })

        setToggle(false)
        setPokeFiltered(allFilteredPoke)
        console.log(filteredPoke);
        setFewPokemons(filteredPoke);

    }
    const handlePageNext = (event) => {
        event.preventDefault()
        setCurrentPage(currentPage + 1)

        console.log(currentPage);
    }
    const handlePagePrevious = (event) => {
        event.preventDefault()
        setCurrentPage(currentPage - 1)
        console.log(currentPage);
    }
    useEffect(() => {
        setCurrentPage(currentPage)
        dispatch(getAllPokemons(currentPage))
        // setEveryPoke(allPokemons)
    }, [currentPage])

    return (
        <div>
            <div className={style.menuContainer}>

            <Nav />
            <button onClick={handleOrder}>{textToggle ? "A-Z" : "Z-A"}</button>
            <button>
                <select value={selectedOption} onChange={handleOptions}>
                    <option value="SHOW ALL">SHOW ALL</option>
                    <option value="">TYPES</option>
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
            <Link to="/form">
                <button>CREATE POKEMON</button>
            </Link>
            <div>

            <button value="previous" onClick={handlePagePrevious} disabled={currentPage < 1}>PREVIOUS PAGE</button>
            <button value="next" onClick={handlePageNext}>NEXT PAGE</button>
            </div>
            </div>
            <h3>{currentPage+1}</h3>
            <Cards
                pokemons={toggle ? pokemons : fewPokemons}
            />
            <Cards
                pokemons={toggle ? allPokemons : pokeFiltered}
            />
        </div>
    )
}