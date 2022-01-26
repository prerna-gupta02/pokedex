import React from 'react';
import { PokemonSchema } from '../../types/PokemonSchema';
import PokeCard from '../pokeCard/PokeCard';
import './Pokelist.css';

interface PokelistProps {
  searchedPokemons: PokemonSchema[];
  handleClick: (pokemonName: string) => void;
}

const Pokelist = ({searchedPokemons, handleClick}: PokelistProps) => {
  return <div className='pokelist'>
      {
        searchedPokemons.map((pokemon) => {
          return (
            pokemon.name && (
              <PokeCard key={pokemon.id} name={pokemon.name} spriteUrl={pokemon.sprites?.normal} handleClick={handleClick} />
            )
          )
        })
      }
  </div>;
};

export default Pokelist;
