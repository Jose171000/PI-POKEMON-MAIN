export default function validation(pokemon) {
    const errors = {}
    if (pokemon.name.length && !/^[a-zA-ZÀ-ÿ]{1,15}$/.test(pokemon.name)) {
        errors.name = "Please, only writo letters with no space between them"
    }
    if (pokemon.image && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(pokemon.image)) {
        errors.image = "Please, only links of an image"
    }
    if (pokemon.life && !/^(?:[0-9]|[1-4][0-9]|50)$/.test(pokemon.life)) {
        errors.life = "Please, only positive integers between 0 to 50"
    }
    if (pokemon.attack && !/^(?:[0-9]|[1-4][0-9]|50)$/.test(pokemon.attack)) {
        errors.attack = "Please, only positive integers between 0 to 50"
    }
    if (pokemon.defense && !/^(?:[0-9]|[1-4][0-9]|50)$/.test(pokemon.defense)) {
        errors.defense = "Please, only positive integers between 0 to 50"
    }
    return errors
}