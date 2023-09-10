const { Type } = require("../db")
const axios = require("axios")

const getAllTypes = async () => {
    const {data} = await axios("https://pokeapi.co/api/v2/type")
    const counter = await Type.count();
    if(!counter){
        const arrayTypes = data.results.map(type => {
            return {name: type['name']}
        })
        const allTypesDB = await Type.bulkCreate(arrayTypes)
        return allTypesDB
    } else {throw new Error("There already are some 'types' in the DB")}
}

module.exports = { getAllTypes }