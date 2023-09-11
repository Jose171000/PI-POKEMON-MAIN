const express = require('express')
const pokemonRoute = express.Router()
const {getAllPokemons, getPokeById, getPokeByName, postPokemons} = require("../handlres/pokeHandlers.js")

pokemonRoute.get("/currentPage", getAllPokemons)

pokemonRoute.get("/name", getPokeByName)

pokemonRoute.get("/:idPokemon", getPokeById)

pokemonRoute.post("/", postPokemons)

module.exports = { pokemonRoute }