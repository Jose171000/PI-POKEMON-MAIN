import { GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_ALL_POKEMONS, POST_POKEMON } from "./action-types";

const initialState = {
    pokemons: [],
    allPokemons: []
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_POKEMON_BY_ID:
            return {
                ...state,
                pokemons: [...state.pokemons, payload]
            }
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                pokemons: [...state.pokemons, ...payload]
            }
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: [...state.allPokemons, ...payload]
            }
        case POST_POKEMON:
            return {
                ...state,
                pokemons: [...state.pokemons, payload]
            }
        default:
            return {
                ...state
            }
    }
}