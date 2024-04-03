
import React, { useEffect, useState } from "react";
import { getPokedexData } from "../../services/apiPokemon";

const Pokemon = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await getPokedexData();
                setPokemons(response);
                console.log(response)
            } catch (error) {
                console.error("Error fetching pokemons:", error);
            }
        };

        fetchPokemons();
    }, []);

    return (
        <div>
                <div class="container-fluid">
                <div class="row">
            {pokemons.slice(1, 100).map((pokemon) => (

                <div key={pokemon.entry_number} class="card" style={{width: "18rem"}}>
                    <img src={pokemon.sprites.regular} alt={pokemon.name.fr} class="card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title">{pokemon.name.fr}</h5>
                        <p class="card-text"></p>
                        <a href="#" class="btn btn-primary">Voir</a>
                    </div>
                </div>
                
            ))}
                </div>
                </div>
        </div>
    );
};

export default Pokemon;