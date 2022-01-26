import React from 'react';
import { PokemonSchema } from '../../types/PokemonSchema';
import Pokelist from '../pokelist/Pokelist';
import PokeSearchResult from '../pokeSearchResult/PokeSearchResult';
import SearchBox from '../searchBox/SearchBox';
import './Pokedex.css'

interface PokedexProps {
    searchedPokemons: PokemonSchema[];
    onInputChange: (inputValue: string) => void;
    selectedPokemon: PokemonSchema | undefined;
    handleClick: (pokemonName: string) => void;
}

const Pokedex = ({ searchedPokemons, onInputChange, selectedPokemon, handleClick } : PokedexProps) => {
  return <div className='pokedex-container'>
      <div className='pokelist-container'>
          <SearchBox onInputChange={onInputChange} />
          <Pokelist searchedPokemons={searchedPokemons} handleClick={handleClick} />
      </div>
      <div className='pokesearchresult-container'>
          <PokeSearchResult selectedPokemon={selectedPokemon} />
      </div>
  </div>;
};

export default Pokedex;
