const fetch = require('node-fetch');

async function getPokedexData() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokedex/1/');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

getPokedexData();