

async function getPokedexData() {
    try {
        const response = await fetch('https://tyradex.tech/api/v1/pokemon');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('erreur', error);
        throw error;
    }
}

getPokedexData()
    .then(data => {
        console.log('pokemon :', data);
    })
    .catch(error => {
        console.error('erreur ', error);
    });

async function getPokemonById(id) {
        try {
            const response = await fetch(`https://tyradex.tech/api/v1/pokemon/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération du Pokémon:', error);
            throw error;
        }
    }
    
    getPokemonById(1)
        .then(data => {
            console.log('Pokémon récupéré avec succès:', data);
        })
        .catch(error => {
            console.error('Une erreur s\'est produite:', error);
        });



        async function getTypes() {
            try {
                const response = await fetch('https://tyradex.tech/api/v1/types');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des types:', error);
                throw error;
            }
        }

        getTypes()
            .then(data => {
                console.log('Types récupérés avec succès:', data);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });

        module.exports = {
            getPokedexData,
            getPokemonById,
            getTypes
        };

