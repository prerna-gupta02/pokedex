import React from 'react';
import './PokeCard.css';

interface PokecardProps{
  spriteUrl? : string;
  name: string | undefined;
  handleClick: (pokemonName: string) => void;
}

const PokeCard = ({ spriteUrl, name, handleClick}: PokecardProps) => {
  return <div onClick={() => {
            console.log(name);
            name && handleClick(name);
          }} className='pokecard'>
      {/*Todo - add image  */}
      <img className='pokemon-sprite' alt='pokemon' src={spriteUrl} />
      <p>{name}</p>
  </div>;
};

export default PokeCard;
