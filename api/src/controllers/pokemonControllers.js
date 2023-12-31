const axios = require("axios");
const { Op } = require("sequelize")
const { Pokemon, Type } = require("../db")

const getAllDetails = async (url, currentPage) => {
  try {
    let every = [];
    const { data } = await axios(`${url}?offset=${currentPage * 12}&limit=12`)
    const allDbPokemons = await Pokemon.findAll({include: Type})

    //Obtén los nombres de los Pokémon de la API
    const apiPokemonNames = data.results.map(pokemon => pokemon.name.trim())

    //consultamos si algun pokemon está en la DB
    const dbPokemons = await Pokemon.findAll({
      where: {
        name: {
          [Op.in]: apiPokemonNames
        }
      }
      
    });
    // Filtra los pokemones que no existen en la base de datos
    const newPokemons = data.results.filter(apiPokemon => {
      return !dbPokemons.includes(apiPokemon.name);
    });
    //Recorro el array 'newPokemons' para hacer la petición de cada Pokemon 
    for (const pokemon of newPokemons) {
      const { data } = await axios(pokemon.url)
      let everyPoke = {
        id: data.id,
        name: data.name,
        image: data.sprites['other']['official-artwork']['front_default'],
        height: data.height,
        weight: data.weight,
        types: data.types.map(type => type['type']['name']).join(', ')
      }
      every.push(everyPoke)
    }
    // const createdAllPoke = await Pokemon.bulkCreate(newPokemons)
    return [...every, ...allDbPokemons]
  } catch (error) {
    console.log("Hey, friend. There's something wrong in the Back-End area", error)
    throw error;
  }
}

const getAllPokemon = async (url, allPoke = []) => {
  const response = await axios(url);
  const newData = response.data;

  allPoke.push(...newData.results);

  if (newData.next) {
    // acá aplico recursión para hacer una petición a la url de 'next'
    return await getAllPokemon(newData.next, allPoke);
  }

  return allPoke;
};

const getPokemonByID = async (id, source) => {
  let currentPoke = {}
  if(source === "externalAPI"){
    const pokemonByID = (await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
    currentPoke = {
      id: pokemonByID.id,
      name: pokemonByID.name,
      image: source === "externalAPI" ?
        pokemonByID.sprites['other']['official-artwork']['front_default']
        : pokemonByID.image,
      life: pokemonByID.stats[0]['base_stat'],
      attack: pokemonByID.stats[1]['base_stat'],
      defense: pokemonByID.stats[2]['base_stat'],
      velocity: pokemonByID.stats[3]['base_stat'],
      height: pokemonByID.height,
      weight: pokemonByID.weight,
      types: pokemonByID.types.map(type => type['type']['name']).join(', ')
    }
    
  }else{
    const pokemonByID = await Pokemon.findByPk(id, {include: Type});
    currentPoke = {
      id: pokemonByID.id,
      name: pokemonByID.name,
      image: pokemonByID.image,
      life: pokemonByID.life,
      attack: pokemonByID.attack,
      defense: pokemonByID.defense,
      velocity: pokemonByID.velocity,
      height: pokemonByID.height,
      weight: pokemonByID.weight,
      types: pokemonByID['types'].length===1 ? `${pokemonByID['types'][0]['name']}` : `${pokemonByID['types'][0]['name']}, ${pokemonByID['types'][1]['name']}`
    }

  }

  if (!currentPoke.name) throw new Error("There's not a pokemon with that name");
  return currentPoke;
}

const searchByName = async (name) => {
  if (!/^[a-zA-Z]+$/.test(name)) throw new Error("Name must be NaN")
  const allPokemons = []
  const control = [];
  const URL = "https://pokeapi.co/api/v2/pokemon";
  const response = await getAllPokemon(URL);
  const allFromDB = await Pokemon.findAll({ where: { name } });
  const pokesByName = response.filter(poke => poke.name === name);

  if (allFromDB.length > 0) {
    allPokemons.push(...allFromDB)
  } else {
    console.log("pokeFromAPI");
    control.push(`There's not a pokemon with name ${name} in the DB`)
  }
  if (pokesByName.length > 0) {
    const { data } = await axios(pokesByName[0]['url'])
    const currentPoke = {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      image: data.sprites['other']['official-artwork']['front_default'],
      types: data.types.map(type => type['type']['name']).join(', ')
    }
    allPokemons.push(currentPoke)
  } else {
    console.log("pokeFromDB");
    control.push(`There's not a pokemon with name ${name} in the external API`)
  }
  if (control.length === 2) throw new Error(`There's not a pokemon with this name: ${name}`);
  return { pokemonByID: allPokemons, errors: control };
}

const postPokemon = async (pokeByBody) => {
  let { name, image, life, attack, defense, types } = pokeByBody
  const createdPokemon = await Pokemon.create({ name, image, life, attack, defense })
  if (!types) throw new Error("chavón, necesitas poner el tipo de pikachu")
  if (Array.isArray(types)) {
    for (let type of types) {
      type = type.toLowerCase()
      const pokeTypes = await Type.findOne({ where: { name: type } })
      await createdPokemon.addTypes(pokeTypes.id)

    }
  } else {
    types = types.toLowerCase()
    const pokeType = await Type.findOne({ where: { name: types } })
    await createdPokemon.addTypes(pokeType.id)
  }
  const officialPokeCreated = await Pokemon.findByPk(createdPokemon.id, {
    include: Type
  })
  

  return officialPokeCreated
}


module.exports = {
  getAllDetails,
  getPokemonByID,
  getAllPokemon,
  searchByName,
  postPokemon
}