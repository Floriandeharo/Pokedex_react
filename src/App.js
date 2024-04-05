import './App.css';
import Pokemon from './Components/Pokemon/Pokemon';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonInfo from './Components/PokemonInfo/PokemonInfo';
import Pokedex from './Components/Pokedex/Pokedex';
import { Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <img src="pokemon-title.png" alt="logo" className="img-fluid ten-pourcent" />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a href="/" className="nav-link active" aria-current="page">Home</a>
              </li>
              <li className="nav-item">
                <a href="/pokemon/pokedex" className="nav-link active" aria-current="page">Pokedex</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Router>
        <Routes>
          <Route path="/" element={<Pokemon />} />
          <Route path="/pokemon/info/:pokemonId" element={<PokemonInfo />} />
          <Route path="/pokemon/pokedex" element={<Pokedex />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
