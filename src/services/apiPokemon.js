

async function getPokedexData() {
    try {
        const response = await fetch('https://tyradex.tech/api/v1/pokemon');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération de la Pokédex:', error);
        throw error;
    }
}

getPokedexData()
    .then(data => {
        console.log('Pokédex récupéré avec succès:', data);
    })
    .catch(error => {
        console.error('Une erreur s\'est produite:', error);
    });

module.exports = {
    getPokedexData
};