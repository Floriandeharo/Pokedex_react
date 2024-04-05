import React, { useEffect, useState } from "react";
import { getPokedexData, getTypes } from "../../services/apiPokemon";
import { Link } from "react-router-dom";
import './Pokemon.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Pokemon = () => {

    const [pokemons, setPokemons] = useState([]);

    const [types, setTypes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTypes, setSelectedTypes] = useState([]);

    const [showFavorites, setShowFavorites] = useState(false);

    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
        return storedFavorites || [];
    });

    const [colors, setColors] = useState([
        '#A01F29',
        '#5CAAB4',
        '#FFDD33',
        '#91c169',
        '#69c1ad',
        '#9069c1',
        '#c16995'
    ]);

    const [bg_color, setBgColor] = useState('#FFDD33');
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 100;

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await getPokedexData();
                setPokemons(response);
            } catch (error) {
                console.error("Error fetching pokemons:", error);
            }
        };

        fetchPokemons();
    }, []);

    const toggleShowFavorites = () => {
        setShowFavorites(!showFavorites);
    };

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await getTypes();
                setTypes(response);
            } catch (error) {
                console.error("Error fetching types:", error);
            }
        };

        fetchTypes();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleFavorite = (pokemon) => {
        if (favorites.some((fav) => fav.pokedex_id === pokemon.pokedex_id)) {
            setFavorites(favorites.filter((fav) => fav.pokedex_id !== pokemon.pokedex_id));
        } else {
            setFavorites([...favorites, pokemon]);
        }
    };

    const handleFilterByType = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    const resetFilter = () => {
        setSelectedTypes([]);
        setSearchTerm("");
    };

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const filteredPokemons = pokemons.filter((pokemon) => {
        if (pokemon.types != null) {
            // Filtrer par nom
            const nameMatch = pokemon.name.fr.toLowerCase().includes(searchTerm.toLowerCase());

            // Filtrer par types sélectionnés
            const typeMatch = selectedTypes.length === 0 || selectedTypes.every((selectedType) =>
                pokemon.types.some((pokemonType) => pokemonType.name === selectedType)
            );

            // Vérifier si le Pokémon est un favori
            const isFavorite = favorites.some((fav) => fav.pokedex_id === pokemon.pokedex_id);

            // Si le mode "Favoris" est activé, vérifier si le Pokémon est favori
            // Sinon, toujours retourner true pour inclure tous les Pokémon
            const favoriteMatch = !showFavorites || isFavorite;

            // Retourner true si le Pokémon correspond à tous les critères de recherche
            return nameMatch && typeMatch && favoriteMatch;
        }
    });

    // Calculate the index range of pokemons to display based on the current page
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="container mt-5">
                <div className="row m-5">
                    <h2 className="text-center">Liste Pokemon</h2>
                </div>
                <hr />
                <div className="row">
                    <h1 className="text-start">Filtre de recherche</h1>
                    <div className="col-6 d-flex align-items-center">
                        <form className="d-flex" style={{ 'width': '100%' }} role="search">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Recherche Pokemon"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </form>
                    </div>
                    <div className="col-6">
                        <div className="">
                            {types.map((type) => (
                                <button
                                    key={type.id}
                                    className={`btn btn-primary m-1 type-button ${selectedTypes.includes(type.name.fr) ? 'active' : ''}`}
                                    onClick={() => handleFilterByType(type.name.fr)}
                                >
                                    {type.name.fr}
                                </button>
                            ))}
                            <button className="btn btn-primary m-1" onClick={resetFilter}>
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center">
                        <nav>
                            <ul className="pagination">
                                {Array.from({ length: Math.ceil(filteredPokemons.length / pokemonsPerPage) }, (_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => paginate(i + 1)}>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    {currentPokemons.map((pokemon) => (
                        <div key={pokemon.entry_number} className="col-3 m-5">
                            <div class="card-hulk" id="hulk">
                                <div class="card-image" style={{ background: colors[Math.floor(Math.random() * colors.length)] }}>
                                    <img src={pokemon.sprites.regular} />
                                </div>
                                <br />
                                <div class="card-text">
                                    <p>{pokemon.name.fr}</p>
                                    <p>
                                        {pokemon.types.map((type) => (
                                            <img key={type.id} src={type.image} className="img-type" alt={type.name} title={type.name} />
                                        ))}
                                    </p>
                                    <div>
                                        <div>
                                            <span>
                                                <button
                                                    className={`btn ${favorites.some((fav) => fav.pokedex_id === pokemon.pokedex_id) ? 'active' : ''}`}
                                                    onClick={() => toggleFavorite(pokemon)}
                                                >
                                                    <span className={`material-symbols-outlined ${favorites.some((fav) => fav.pokedex_id === pokemon.pokedex_id) ? 'material-symbols-outlined-fill' : ''}`}>
                                                        favorite
                                                    </span>
                                                </button>
                                            </span>
                                            <span>
                                                <button className="btn color-red">
                                                    <Link to={`/pokemon/info/${pokemon.pokedex_id}`}>
                                                        <span class="material-symbols-outlined">
                                                            visibility
                                                        </span>
                                                    </Link>
                                                </button>
                                            </span>
                                        </div>
                                        <div><span className="number">  n°{pokemon.pokedex_id.toString().padStart(3, '0')}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pokemon;
