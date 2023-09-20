import SearchBar from "../SearchBar/SearchBar"
export default function Nav ({handleClick}){
    return(
        <nav>
            <SearchBar handleClick={handleClick}/>
        </nav>
    )
}