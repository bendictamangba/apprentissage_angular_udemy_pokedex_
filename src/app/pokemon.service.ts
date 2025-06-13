import { Injectable } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.models';
import { POKEMON_LIST } from './pkemon-list.fake';

@Injectable(
  //{ providedIn: 'root'}
)
export class PokemonService {

  getPokemonList():PokemonList{
    return POKEMON_LIST;
  }

 getPokemonById(id: number): Pokemon {
  const pokemon = POKEMON_LIST.find(pokemon => pokemon.id === id);
  if (!pokemon) {
    throw new Error('Pokemon introuvable');
  }
  return pokemon;
}

  getPokemonTypeList():string[]{
    return ['Feu', 'Eau', 'Plante', 'Insecte', 'Vol', 'Poison', 'Fée', 'Electrik'];
  }
}
