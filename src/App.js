import './App.css';
import Pokemon from './Components/Pokemon/Pokemon';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonInfo from './Components/PokemonInfo/PokemonInfo';
import { Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/pokemon/info/:pokemonId" element={<PokemonInfo />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
