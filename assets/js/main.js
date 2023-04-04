const loadMoreButton = document.getElementById("loadMoreButton")
const limit = 10
let offset = 0
const maxRecords = 151

function createTypeList (pokemonTypes){
    return pokemonTypes.map(typeSlot =>  `<li class="type">${typeSlot.type.name}</li>`)
}

const pokemonList = document.getElementById("pokemonList")

function loadPokemonItems (offset, limit) {
    function convertToPokemonHtml(pokemon){
        return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src= ${pokemon.photo} 
                        alt=${pokemon.name}>
                </div>
            </li>
        `
    }

    pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
        const newHtml = pokemons.map(convertToPokemonHtml).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {

    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords){
        const newLimit =  maxRecords - offset
        loadPokemonItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
        
    }
    else
        loadPokemonItems(offset, limit)
})

// pokeApi.getPokemons().then((pokemons = []) => {
//         pokemonList.innerHTML = pokemons.map(convertToPokemonHtml).join('')
//     })
//     .catch((error) => console.error(error))

