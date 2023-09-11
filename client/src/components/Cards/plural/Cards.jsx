import Card from "../singular/Card";
import style from "./Cards.module.css"

export default function Cards({pokemons}) {
    return (
        <div className={style.divContainer}>
            {pokemons?.map((pokemon, index)=>{
                return(
                    <Card 
                    className={style.eachCard}
                    key={index}
                    pokemon={pokemon}
                    />
                )
                }
            )}
        </div>
    )
}