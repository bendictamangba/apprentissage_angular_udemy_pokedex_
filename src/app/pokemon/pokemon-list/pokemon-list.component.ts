import { Component, computed, inject, signal } from '@angular/core';
import { PokemonService } from '../../pokemon.service';
import { Pokemon } from '../../pokemon.models';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonBorderDirective, DatePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: ``
})
export class PokemonListComponent {

  readonly #pokemonService = inject (PokemonService);
  readonly searchTerm = signal ('');
  readonly pokemonsListFiltre = computed (()=>{
   const searchTerm = this.searchTerm();
   const pokemon_list = this.pokemon_list();
   return pokemon_list.filter((pokemon) => 
    pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
   
  
  })
  


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


incrementerlife(un_pokemon:Pokemon){ 
  un_pokemon.life++;
}
decrementerlife(un_pokemon:Pokemon){
  un_pokemon.life--;
}

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
