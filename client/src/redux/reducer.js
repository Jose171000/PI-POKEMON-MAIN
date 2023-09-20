import { GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_ALL_POKEMONS, POST_POKEMON, GET_ALL_TYPES, FROM_API_EXTERNAL, FROM_DATA_BASE, DELETE_POKEMON, DELETE_POKEMON_API } from "./action-types";

const initialState = {
    pokemons: [],
    allPokemons: [],
    allTypes: [],
    pokeDetail: {},
    filterByOrigin: [],
    deleteCounter: 0
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_POKEMON_BY_ID:
            return {
                ...state,
                pokeDetail: { ...payload }
            }
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                allPokemons: [...state.allPokemons, ...payload]
            }
        case GET_ALL_POKEMONS:
            const allPoke = payload.map(poke => {
                if (isNaN(Number(poke['id']))) {
                    const DBPoke = {
                        ...poke,
                        types: poke['types'].length === 1 ? `${poke['types'][0]['name']}` : `${poke['types'][0]['name']}, ${poke['types'][1]['name']}`
                    }
                    return DBPoke
                } else {
                    return poke;
                }
            })
            return {
                ...state,
                allPokemons: [...allPoke],

            }
        case POST_POKEMON:
            return {
                ...state,
                pokemons: [...state.pokemons, payload]
            }
        case GET_ALL_TYPES:
            return {
                ...state,
                allTypes: [...payload]
            }
        case FROM_API_EXTERNAL:
            return {
                ...state,
                filterByOrigin: [...state.allPokemons.filter(poke => !isNaN(Number(poke['id'])))]
            }
        case FROM_DATA_BASE:
            return {
                ...state,
                filterByOrigin: [...state.allPokemons.filter(poke => isNaN(Number(poke['id'])))]
            }
        case DELETE_POKEMON:
            return {
                ...state,
                deleteCounter: state.deleteCounter + payload
            }
        case DELETE_POKEMON_API:
            return {
                ...state,
                allPokemons: state.allPokemons.filter(pokes => pokes.id !== payload)
            }
        default:
            return {
                ...state
            }
    }
}