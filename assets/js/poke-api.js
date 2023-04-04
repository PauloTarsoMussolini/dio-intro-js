const pokeApi = {}

function convertToModel(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.types = types
    const [ type ] = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon

}
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertToModel)
}
pokeApi.getPokemons = (offset = 0,  limit = 5) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detail) => Promise.all(detail))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))
}

