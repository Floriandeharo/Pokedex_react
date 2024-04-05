import React, { useEffect, useState } from "react";
import { getPokedexData, getTypes } from "../../services/apiPokemon";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([]);
    const [types, setTypes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTypes, setSelectedTypes] = useState([]);

    const [showFavorites, setShowFavorites] = useState(true);

    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
        return storedFavorites || [];
    });

    
    // console.log('favorites', favorites)

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



    // const toggleShowFavorites = () => {
    //     setShowFavorites(!showFavorites);
    // };
    
    
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

 console.log('filteredPokemons', filteredPokemons)
    return (
        <div>
            
            <div className="container-fluid mt-5">
                <div className="row m-5">
                    <h1 className="text-center">Pokedex</h1>
                    </div>
                <div className="row">
                    <div className="col-6 d-flex align-items-center">
                <form className="d-flex" style={{'width':'100%'}} role="search">
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
                    <div className="col-md-6 offset-md-3 mb-4">
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
                <div className="row">
                    {filteredPokemons.slice(0, 100).map((pokemon) => (

                        
                        <div key={pokemon.entry_number} className="card" style={{ width: "18rem" }}>
                            <img  src={pokemon.sprites.regular} alt={pokemon.name.fr} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{pokemon.name.fr}</h5>
                                    <p className="card-text">n°{pokemon.pokedex_id.toString().padStart(3, '0')}</p>
                                    <div className="d-flex justify-content-between">
                                    <button
                                        className={`btn btn-primary ${favorites.some((fav) => fav.pokedex_id === pokemon.pokedex_id) ? 'active' : ''}`}
                                        onClick={() => toggleFavorite(pokemon)}
                                    >
                                        
                                        <span className={`material-symbols-outlined ${favorites.some((fav) => fav.pokedex_id === pokemon.pokedex_id) ? 'material-symbols-outlined-fill' : ''}`}>
                                            favorite
                                        </span> 
                                    </button>
                                    <Link className="btn btn-primary" to={`/pokemon/info/${pokemon.pokedex_id}`}>
                                        Consulter
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pokedex;
