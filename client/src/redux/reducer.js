import { GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_ALL_POKEMONS, POST_POKEMON, GET_ALL_TYPES } from "./action-types";

const initialState = {
    pokemons: [],
    allPokemons: [],
    allTypes: []
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
                allPokemons: [ ...payload],

            }
        case POST_POKEMON:
            return {
                ...state,
                pokemons: [...state.pokemons, payload]
            }
        case GET_ALL_TYPES:
            return{
                ...state,
                allTypes: [...payload]
            }
        default:
            return {
                ...state
            }
    }
}