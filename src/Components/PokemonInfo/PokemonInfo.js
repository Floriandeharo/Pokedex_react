import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonById } from '../../services/apiPokemon';
import { Link } from 'react-router-dom';
import './PokemonInfo.css';
function PokemonInfo() {
  const { pokemonId } = useParams();
  console.log(pokemonId)
const [pokemon, setPokemon] = useState(null);

useEffect(() => {
    const fetchPokemon = async () => {
        try {
            const response = await getPokemonById(pokemonId);
            setPokemon(response);
            console.log('pokemon', response)
        } catch (error) {
            console.error(error);
        }
    };

    fetchPokemon();
}, [pokemonId]);

const [pokemonSrc, setPokemonSrc] = useState(false);

const PokemonSRCToggle = () => {
    setPokemonSrc(!pokemonSrc);
};


console.log(pokemon)

return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-1 d-flex justify-content-center align-items-center' style={{"margin-left" : "1.5%"}}>
                    {pokemonId > 1 && (
                        <Link className="btn btn-primary " to={`/pokemon/info/${parseInt(pokemonId) - 1}`}> &laquo; n°{parseInt(pokemonId) - 1} </Link>
                    )}
                </div>
                <div className='col-9'>
                    <h2 className='d-flex justify-content-center'>Carte Pokémon n°{pokemon?.pokedex_id.toString().padStart(3, '0')}</h2>
                </div>
                <div className='col-1  d-flex justify-content-center align-items-center'>
                    <Link className="btn btn-primary " to={`/pokemon/info/${parseInt(pokemonId) + 1}`}> n°{parseInt(pokemonId) + 1} &raquo; </Link>
                </div>
            </div>
            <div className='row justify-content-center'>
                {pokemon ? (
                    <div  className='card-info-pokemon' >
                        <div className='row'>
                            <div className='col-2 offset-2text-start '>
                                <h1 className='text-start'  style={{marginBottom :"0%"}}>{pokemon.name.fr}</h1>
                            </div>
                            <div className='col-2 offset-8 float-end justify-content-end d-flex align-items-center'>         
                                {pokemon.types.map((type) => (
                                    <img src={type.image} className='rounded-circle border  border-dark' style={{height:"70%"}} alt={type.name} />
                                ))}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12  d-flex justify-content-center'>
                                <div className='container-img-pokemon'  onClick={PokemonSRCToggle} title='Shiny mode'>
                                    <img  src={pokemonSrc ? pokemon.sprites.shiny : pokemon.sprites.regular}  alt={pokemon.name.fr} class="card-img-pokemon "/>
                                </div>
                            </div>
                        </div>
                        <div >
                            <div className='container-fluid'>
                                <div className='row mb-4 fs-5 fw-bolder '>
                                    <div className='col-6  case-middle'>
                                        <table style={{width:"98%"}}>
                                            <tbody>
                                                <tr >
                                                    <td className='text-start'>Attaque:</td>
                                                    <td  className='text-end'>{pokemon.stats.atk}</td>
                                                </tr>
                                                <tr>
                                                    <td  className='text-start'>Attaque speciale:</td>
                                                    <td  className='text-end'>{pokemon.stats.spe_atk}</td>
                                                </tr>
                                                <tr>
                                                    <td  className='text-start'>Defense:</td>
                                                    <td  className='text-end'>{pokemon.stats.def}</td>
                                                </tr>
                                                <tr>
                                                    <td  className='text-start'>Defense speciale:</td>
                                                    <td  className='text-end'>{pokemon.stats.spe_def}</td>
                                                </tr>
                                                <tr>
                                                    <td  className='text-start'>Vitesse:</td>
                                                    <td  className='text-end'>{pokemon.stats.vit}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='col-6  case-middle  d-flex justify-content-center align-items-center'>
                                        <table>
                                            <tbody>
                                                <tr >
                                                    <td className='text-start'>Point de Vie:</td>
                                                    <td  className='text-end'>{pokemon.stats.hp}</td>
                                                </tr>
                                                <tr >
                                                    <td className='text-start'>Taille:</td>
                                                    <td  className='text-end'>{pokemon.height}</td>
                                                </tr>
                                                <tr>
                                                    <td  className='text-start'>Poid</td>
                                                    <td  className='text-end'>{pokemon.weight}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    </div>
);
}

export default PokemonInfo;
