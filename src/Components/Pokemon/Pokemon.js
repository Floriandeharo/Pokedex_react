
import React, { useEffect, useState } from "react";
import { getPokedexData, getTypes } from "../../services/apiPokemon";
import { Link } from "react-router-dom";
import './Pokemon.css';
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
    const [types, setTypes] = useState([]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await getTypes();
                setTypes(response);
                console.log(response);
            } catch (error) {
                console.error("Error fetching types:", error);
            }
        };

        fetchTypes();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPokemons = pokemons.filter((pokemon) => {
        return pokemon.name.fr.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  <img src="pokemon-title.png"  alt="logo" class="img-fluid ten-pourcent" />
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input
                            type="text"
                            class="form-control"
                            placeholder="Recherche Pokemon"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
      </form>
    </div>
  </div>
</nav>
            <div class="container-fluid mt-5">
                
                {/* <div class="row">
                    <div class="col-md-6 offset-md-3 mb-4">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Recherche Pokemon"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div> */}
                    <div class="row">
                        <div class="col-md-6 offset-md-3 mb-4">
                        {types.map((type) => (
                            <button key={type.id} className="btn btn-primary m-1 type-button">
                                {type.name.fr}
                            </button>
                        ))}
                        </div>
                    </div>
                
                <div class="row">
                    {filteredPokemons.slice(1, 100).map((pokemon) => (
                        <div key={pokemon.entry_number} class="card" style={{ width: "18rem" }}>
                            <img src={pokemon.sprites.regular} alt={pokemon.name.fr} class="card-img-top" />
                            <div class="card-body">
                                <h5 class="card-title">{pokemon.name.fr}</h5>
                                <p class="card-text"></p>
                                <Link className="btn btn-primary" to={`/pokemon/info/${pokemon.pokedex_id}`}>
                                    voir
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pokemon;