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

 getPokemonById(id: number): Pokemon | undefined {
  const pokemon = POKEMON_LIST.find(pokemon => pokemon.id === id);
  // if (!pokemon) { // Plus besoin de lever une erreur ici
  //   return undefined; // find retourne déjà undefined si non trouvé
  // }
  return pokemon;
}

  getPokemonTypeList():string[]{
    return ['Feu', 'Eau', 'Plante', 'Insecte', 'Vol', 'Poison', 'Fée', 'Electrik'];
  }
}
