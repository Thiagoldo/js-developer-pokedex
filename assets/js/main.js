const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        catchPokemon();
    })
}

function convertDetailToHtml(pokemon) {
    return `
    <h1>Pokedex</h1>
    
    <section class="${pokemon.type}">
    <div class="head">
    <div class="name">
    <h2>#${pokemon.number} - ${pokemon.name}</h2>
    </div>
    <div class="photo">
    <img src="${pokemon.photo}"
    alt="${pokemon.name}" />
            </div>
        </div>
        
        <div class="body">
            <h3>Types</h3>
            <div class="types">
            <ol>
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <h3>Attributes</h3>
            <div class="attributes">
            <span>Height</span>
            <span>${pokemon.height}</span>
                <span>Weight</span>
                <span>${pokemon.weight}</span>
                </div>
                <h3>Skills</h3>
                <div class="skills">
                <span>Attack</span>
                <span>${pokemon.attack}</span>
                <span>Defense</span>
                <span>${pokemon.defense}</span>
                <span>Speed</span>
                <span>${pokemon.speed}</span>
                </div>
                </div>
                </section>
    
                <div class="pagination">
        <button id="backButton" type="button">
        Back
        </button>
        </div>
        `
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

let SELECTED_POKEMON_ID = "";

function catchPokemon() {
    const pokemons = document.getElementsByClassName('pokemon');
    for (const pokemon of pokemons) {
        pokemon.addEventListener('mouseover', () => {
            let pokemonNumber = pokemon.children.item(0).innerHTML;
            SELECTED_POKEMON_ID = pokemonNumber.slice(1);
        })

        pokemon.addEventListener('click', () => {
            pokeApi.getPokemonById(SELECTED_POKEMON_ID).then((pokemon) => {
                const newHtml = convertDetailToHtml(pokemon);
                const pokedetail = document.getElementById('content')
                pokedetail.innerHTML = newHtml;

                const backButton = document.getElementById('backButton')

                backButton.addEventListener('click', () => {
                    window.location.reload();
                })
            })
        })
    }
}

