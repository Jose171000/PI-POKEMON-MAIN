export default function validation(pokemon) {
    const errors = {}
    if (pokemon.name.length && !/^[a-zA-ZÀ-ÿ]{1,15}$/.test(pokemon.name)) {
        errors.name = "Please, only write letters with no space between them"
    }
    if (pokemon.image && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(pokemon.image)) {
        errors.image = "Please, only links of an image"
    }
    if (pokemon.life && !/^(100|[1-9][0-9]?|0|[1-9]?[0-9])$/.test(pokemon.life)) {
        errors.life = "Please, only positive integers between 0 to 100"
    }
    if (pokemon.attack && !/^(100|[1-9][0-9]?|0|[1-9]?[0-9])$/.test(pokemon.attack)) {
        errors.attack = "Please, only positive integers between 0 to 100"
    }
    if (pokemon.defense && !/^(100|[1-9][0-9]?|0|[1-9]?[0-9])$/.test(pokemon.defense)) {
        errors.defense = "Please, only positive integers between 0 to 100"
    }
    if (pokemon.velocity && !/^(1[0-4][0-9]|150|[1-9][0-9]?|0)$/.test(pokemon.velocity)){
        errors.velocity = "Please, only positive integers between 0 to 150"
    }
    if(pokemon.height && !/^(?:[0-9]|[1-4][0-9]|50)$/.test(pokemon.height)){
        errors.height = "Please, only positive integers between 0 to 50"
    }
    if(pokemon.weight && !/^(5000|[1-9][0-9]{0,3}|[1-4][0-9]{3}|[1-9]?[0-9]{1,2})$/.test(pokemon.weight)){
        errors.weight = "Please, only positive integers between 0 to 5000"
    }
    return errors
}