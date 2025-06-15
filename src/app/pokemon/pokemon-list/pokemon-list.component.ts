import { Component, computed, inject, signal } from '@angular/core';
import { PokemonService } from '../../pokemon.service';
import { Pokemon } from '../../pokemon.models';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',

  imports: [ DatePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: `.pokemon-card{cursor:pointer}`
})
export class PokemonListComponent {

  readonly #pokemonService = inject (PokemonService);
  readonly pokemonList = toSignal(this.#pokemonService.getPokemonList(), {
    initialValue: [],
  });
  readonly searchTerm = signal ('');

  readonly pokemonsListFiltre = computed (()=>{
   const searchTerm = this.searchTerm();
   const pokemonList = this.pokemonList();
   
   return pokemonList.filter((pokemon) => 
    pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
   
  
  })
  
readonly loading = computed(()=> this.pokemonList().length ==0);

  // name = 'Pikachu';
  // life =21;

  // sayHello(){
  //   console.log("hello");
    
  // }

  // incrementerLife(){
  //   this.life++;
  // }
  // decrementerLife(){
  //   this.life--;
  // }
  

//implementation des signaux
// name = signal('pikachou');
// life = signal(21);

// incrementer(){
//   this.life.update((life)=>life+1);
// }
// decrementer(){
//   this.life.update((life)=>life-1);
// }

// size = computed(()=>{
//   if (this.life()<15 ){
//     return 'Petit';
//   }if(this.life()>30){
//     return 'Grand';
//   }else{
//     return 'Moyen';
    
//   }
  
// });
//  imageSrc = signal('https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png');


//pokemon_list = signal(POKEMON_LIST);


pokemon_list = signal( this.#pokemonService.getPokemonList());



 //life = signal(21);

size(un_pokemon:Pokemon) {

  if (un_pokemon.life<= 15 ){
    return 'Petit';
  }
  if(un_pokemon.life >= 30){
    return 'Grand';
  }
  else{
    return 'Moyen';
    
  }
}

}
