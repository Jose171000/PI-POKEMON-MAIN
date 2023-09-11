import { GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_ALL_POKEMONS, POST_POKEMON, GET_ALL_TYPES } from "./action-types";
import axios from "axios"
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL
const VITE_SERVER_URL_TYPES = import.meta.env.VITE_SERVER_URL_TYPES

export const getPokemonById = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios(`${VITE_SERVER_URL}${id}`)
            dispatch({ type: GET_POKEMON_BY_ID, payload: data })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export const getPokemonByName = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios(`${VITE_SERVER_URL}name?name=${name}`)
            dispatch({ type: GET_POKEMON_BY_NAME, payload: data.result })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export const getAllPokemons = (currentPage) => {
    console.log(currentPage);
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${VITE_SERVER_URL}currentPage?currentPage=${currentPage}`)
            dispatch({ type: GET_ALL_POKEMONS, payload: data.result })
        } catch (error) {
            alert(error.response.data.error.data)
        }
    }
}

export const postPokemon = (pokeData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(VITE_SERVER_URL, pokeData)
            dispatch({ type: POST_POKEMON, payload: data })
        } catch (error) {

            alert(error.message)

        }
    }
}

export const getAllTypes = () => {
    console.log(VITE_SERVER_URL_TYPES);
    return async (dispatch) => {
        try {
            const { data } = await axios(VITE_SERVER_URL_TYPES)
            dispatch({ type: GET_ALL_TYPES, payload: data.result })
        } catch (error) {
            console.log(error.message)
        }
    }
}