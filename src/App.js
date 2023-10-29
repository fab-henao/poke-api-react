import React, { useEffect, useState } from 'react'
import "./App.css"

const App = () => {

  const [urlapi, setUrlapi] = useState(null);

  const [pokemon, setPokemon] = useState(null);

  const renderCardPokemon = () => {
    if (!pokemon) {
      return <h1>No existe el pokemon {pokemon}</h1>
    }
    const pokemonFinal = {
      img: pokemon.sprites.other.dream_world.front_default ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other['official-artwork'].front_default,
      nombre: pokemon.name,
      hp: pokemon.stats[0].base_stat,
      experiencia: pokemon.base_experience,
      ataque: pokemon.stats[1].base_stat,
      especial: pokemon.stats[2].base_stat,
      defensa: pokemon.stats[3].base_stat
    }

    if (!pokemonFinal.img) {
      return refreshPokemon();
    }

    return <>
      <article class="card">
        <div class="card-body">
          <img src={pokemonFinal.img} alt={`imagen de ${pokemonFinal.nombre}`} class="card-body-img" />
          <h1 class="card-body-title">{pokemonFinal.nombre} <span>{pokemonFinal.hp}hp</span></h1>
          <p class="card-body-text">{pokemonFinal.experiencia} exp</p>
        </div>
        <div class="card-footer">
          <div class="card-footer-social">
            <h3>{pokemonFinal.ataque}K</h3>
            <p>Ataque</p>
          </div>
          <div class="card-footer-social">
            <h3>{pokemonFinal.especial}K</h3>
            <p>Ataque Especial</p>
          </div>
          <div class="card-footer-social">
            <h3>{pokemonFinal.defensa}K</h3>
            <p>Defensa</p>
          </div>
        </div>
      </article>
      <button className='refresh-button' onClick={() => refreshPokemon()}>Ver otro pokemon</button>
    </>
  }

  const fetchPokemon = async () => {
    const response = await fetch(urlapi);
    const pokemons = await response.json()
    setPokemon(pokemons);
  }

  const getNumberRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const refreshPokemon = () => {
    const maxPokemon = 1000;
    const minPokemon = 1;
    const numberRandom = getNumberRandom(maxPokemon, minPokemon);
    setUrlapi("https://pokeapi.co/api/v2/pokemon/" + numberRandom)
  }

  useEffect(() => {
    refreshPokemon();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    fetchPokemon();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlapi])


  return <>
    <main>
      {pokemon && renderCardPokemon()}
    </main>
  </>
}

export default App