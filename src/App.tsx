import React, { useEffect, useState } from 'react';
import './App.css';
import Pokedex from './components/pokedex/Pokedex';
import { pokemonData } from './data/pokemonData';
import { PokemonSchema, PokemonSpriteSchema, UnpatchedPokemonSchema } from './types/PokemonSchema';

interface AppState {
  searchField: string;
  allPokemons: PokemonSchema[];
  searchPokemons: PokemonSchema[];
  selectedPokemon: PokemonSchema | undefined;
}

const App : React.FC<any & AppState> = () => {

  const [data, setData] = useState<AppState>({
    searchField: "",
    allPokemons: [],
    searchPokemons: [],
    selectedPokemon: undefined
  });

  const patchPokemonData = (pokemons : UnpatchedPokemonSchema[]) => {
    const patchedPokemons = pokemons.map((pokemon) => {
      let parsedSprites : PokemonSpriteSchema = {
        normal: undefined,
        animated: undefined
      };
      try{
        parsedSprites = pokemon.sprites && JSON.parse(pokemon.sprites);
      }catch(e){
        console.log("Exception" + e);
      }
      const patchedPokemon : PokemonSchema = {
        ...pokemon,
        sprites: parsedSprites
      }
      return patchedPokemon;
    })
    return patchedPokemons;
  } 

  useEffect (() => {
    // Patch the stingified pokemon sprites
    const patchedPokemons: PokemonSchema[] = patchPokemonData(pokemonData);
    // Update the state with the patched pokemon
    setData({ ...data, allPokemons : patchedPokemons, searchPokemons: patchedPokemons});
    console.log(patchedPokemons);
  }, [])

  const handleInputChange = (inputValue: string) => {
    // console.log("from app.tsx : " + inputValue);
    // filter the searched pokemons
    const { allPokemons } = data;
    const searchedPokemons = allPokemons.filter(
      (pokemon: PokemonSchema) => {
        return (
          pokemon.name && 
          pokemon.name
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())
        )
      });
      setData({
        ...data,
        searchField: inputValue,
        searchPokemons: searchedPokemons
      })
  }

  const handleClick = (pokemonName: string) => {
    console.log("hi");
    
    const { searchPokemons } = data;
    // find the selected pokemon from searched pokemons
    const selectedPokemon = searchPokemons.find(
      (pokemon: PokemonSchema) => 
        pokemon.name === pokemonName
      );
    // update the state
    setData({
      ...data,
      selectedPokemon: selectedPokemon
    });
  };

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <Pokedex 
        searchedPokemons={data.searchPokemons} 
        onInputChange={handleInputChange}
        selectedPokemon={data.selectedPokemon}
        handleClick={handleClick}
      />
    </div>
  );
}

export default App;
