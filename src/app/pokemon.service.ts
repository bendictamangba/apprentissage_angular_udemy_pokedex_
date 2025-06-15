import { inject, Injectable } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.models';
import { POKEMON_LIST } from './pkemon-list.fake';
import { HttpClient } from '@angular/common/http';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Observable } from 'rxjs';


// export class PokemonService {

//   //readonly #http = inject(HttpClient);
//   readonly #POKEMONN_API_URL = 'http://localhost:3000/pokemons';
//   readonly #http = inject(HttpClient);
 


//    getPokemonList(): Observable<PokemonList>{
//     return this.#http.get<PokemonList>(this.#POKEMONN_API_URL);
  
//   }


//  getPokemonById(id: number): Observable<Pokemon > {
//   const url = this.#POKEMONN_API_URL + '/'  + id ;
//   return this.#http.get<Pokemon>(url);
// }

//   getPokemonTypeList():string[]{
//     return ['Feu', 'Eau', 'Plante', 'Insecte', 'Vol', 'Poison', 'Fée', 'Electrik'];
//   }


// updatePokemon(pokemon: Pokemon): Observable<Pokemon>{
//   const url = this.#POKEMONN_API_URL + '/' + pokemon.id;
//   return this.#http.put<Pokemon>(url, pokemon);
// }

// deletePokemon(id: number): Observable<void>{
//   const url = this.#POKEMONN_API_URL + '/' + id;
//   return this.#http.delete<void>(url);
// }

// addPokemon (pokemon:Omit <Pokemon, 'id'>):Observable<Pokemon>{
//   return this.#http.post<Pokemon>(this.#POKEMONN_API_URL,pokemon); 

// }


  
// }

export abstract class PokemonService {
  abstract getPokemonList(): Observable<PokemonList>;
  abstract getPokemonById(id: number): Observable<Pokemon>;
  abstract updatePokemon(pokemon: Pokemon): Observable<Pokemon>;
  abstract deletePokemon(pokemonId: number): Observable<void>;
  abstract addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon>;
  abstract getPokemonTypeList(): string[];
}


