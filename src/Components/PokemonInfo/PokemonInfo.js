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



return (
    <div>
        <div className='container-fluid'>
            <div className='row'>
                
            </div>
            <div className='row'>
                <div className='col-6'>
                    <Link className="btn btn-primary " to={`/pokemon/info/${parseInt(pokemonId) - 1}`}> &laquo; n°{parseInt(pokemonId) - 1} </Link>
                </div>
                <div className='col-6'>
                    <Link className="btn btn-primary " to={`/pokemon/info/${parseInt(pokemonId) + 1}`}> n°{parseInt(pokemonId) + 1} &raquo; </Link>
                </div>
            </div>
            {pokemon ? (
                <div className='card-pokemon'>
                    <h1>{pokemon.name.fr}</h1>
                    <img src={pokemon.sprites.regular} style={{width:"20em"}} alt={pokemon.name.fr} class="card-img "/>
                    n°{pokemon.pokedex_id.toString().padStart(3, '0')}
                    <div >
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-4  case-left'>
                                <div className='row d-flex justify-content-center'>
                                <h3 >Type </h3>
                                </div>
                <div className='row'>
                                        {pokemon.types.map((type) => (
                                           
                                                    <img src={type.image} style={{width:"auto", height:"auto"}} alt={type.name} />
           
                                        ))}

                            </div>
                            </div>
                            <div className='col-4 case-middle'>
                                <h3>Stats </h3>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Point de vie :</td>
                                            <td>{pokemon.stats.hp}</td>
                                        
                                            <td>attaque:</td>
                                            <td>{pokemon.stats.atk}</td>
                                        </tr>
                                        <tr>
                                            <td>defense:</td>
                                            <td>{pokemon.stats.def}</td>
                                        
                                            <td>attaque speciale:</td>
                                            <td>{pokemon.stats.spe_atk}</td>
                                        </tr>
                                        <tr>
                                            <td>defense speciale:</td>
                                            <td>{pokemon.stats.spe_def}</td>
                                        
                                            <td>vitesse:</td>
                                            <td>{pokemon.stats.vit}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-4 case-right'>
                                <h3>Informations </h3>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>taille:</td>
                                            <td>{pokemon.height}</td>
                                        </tr>
                                        <tr>
                                            <td>poids:</td>
                                            <td>{pokemon.weight}</td>
                                        </tr>
                                        <tr>
                                            <td>talent:</td>
                                            <td>{pokemon.talents[0].name}</td>
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
);
}

export default PokemonInfo;
