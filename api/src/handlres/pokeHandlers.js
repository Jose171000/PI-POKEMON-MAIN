const { getAllDetails, getPokemonByID, searchByName, postPokemon } = require("../controllers/pokemonControllers.js")
const axios = require("axios")
const {Pokemon} = require("../db.js")

const getAllPokemons = async (req, res) => {
    console.log("toy en getAllPokemons");
    try {
        const { currentPage } = req.query
        const URL = "https://pokeapi.co/api/v2/pokemon";
        const data = await getAllDetails(URL, currentPage)

        return res.status(200).json({ msg: 'OK', result: data })

    } catch (error) {
        return res.status(500).json({
            msg: 'Not Found',
            data: `Also: ${error.message}`
        })
    }
}
const getPokeById = async (req, res) => {
    console.log("Estoy entrando a getPokeById");
    const { idPokemon } = req.params;
    const source = isNaN(idPokemon) ? "dataBase" : "externalAPI"
    try {
        const response = await getPokemonByID(idPokemon, source);
        res.status(200).json(response);
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

const getPokeByName = async (req, res) => {
    try {
        console.log("getPokeByName");
        const nombre = req.query.name;
        const name = nombre.toLowerCase()
        const { pokemonByID, errors } = await searchByName(name)
        if (errors.length) {
            return res.status(200).json({ result: pokemonByID, error: errors[0] })
        }
        res.status(200).json({ result: pokemonByID })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const postPokemons = async (req, res) => {
    try {
        const pokeByBody = req.body
        console.log("estoy en postPoke", pokeByBody);
        const createdPokemon = await postPokemon(pokeByBody)
        res.status(201).json(createdPokemon)
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log(error.message);
    }
}
const deletePoke = async (id) => {
    const poke = Pokemon.destroy({where:{
        id
    }})
    return poke
}
const deletePokemon = async (req, res) => {
    console.log("estoy en deletePokemon");
    try {
        const {id} = req.query
        const deletePok = await deletePoke(id)
        res.json({result:deletePok})
    } catch (error) {
        res.json({error:error.message})
    }
}

module.exports = {
    getAllPokemons,
    getPokeById,
    getPokeByName,
    postPokemons,
    deletePokemon
}