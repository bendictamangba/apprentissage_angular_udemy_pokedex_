// import { Component, computed, inject, signal } from '@angular/core';
// import { PokemonService } from '../../pokemon.service';
// import { Pokemon } from '../../pokemon.models';
// import { PokemonBorderDirective } from '../../pokemon-border.directive';
// import { CommonModule, DatePipe } from '@angular/common';
// import { RouterLink } from '@angular/router';

// import { toSignal } from '@angular/core/rxjs-interop';

// @Component({
//   selector: 'app-pokemon-list',

//   imports: [ DatePipe, RouterLink],
//   templateUrl: './pokemon-list.component.html',
//   styles: `.pokemon-card{cursor:pointer}`
// })
// export class PokemonListComponent {

//   readonly #pokemonService = inject (PokemonService);
//   readonly pokemonList = toSignal(this.#pokemonService.getPokemonList(), {
//     initialValue: [],
//   });
//   readonly searchTerm = signal ('');

//   readonly pokemonsListFiltre = computed (()=>{
//    const searchTerm = this.searchTerm();
//    const pokemonList = this.pokemonList();
   
//    return pokemonList.filter((pokemon) => 
//     pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));

   
//   })
  
// readonly loading = computed(()=> this.pokemonList().length ==0);

// pokemon_list = signal( this.#pokemonService.getPokemonList());



//  //life = signal(21);

// size(un_pokemon:Pokemon) {

//   if (un_pokemon.life<= 15 ){
//     return 'Petit';
//   }
//   if(un_pokemon.life >= 30){
//     return 'Grand';
//   }
//   else{
//     return 'Moyen';
    
//   }
// }

// }



import { Component, computed, inject, signal } from '@angular/core';
import { PokemonService } from '../../pokemon.service';
import { Pokemon } from '../../pokemon.models';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: [`.pokemon-card { cursor: pointer; }`]
})
export class PokemonListComponent {

  readonly #pokemonService = inject(PokemonService);

  readonly pokemonList = toSignal(this.#pokemonService.getPokemonList(), {
    initialValue: [],
  });

  readonly searchTerm = signal('');
  readonly typeSelected = signal<string | null>(null);

  // Liste des types distincts disponibles
  readonly typeList = computed(() => {
    const allTypes = this.pokemonList().flatMap((pokemon) => pokemon.types);
    return [...new Set(allTypes)];
  });

  // Liste filtrée selon le nom et le type
  readonly pokemonsListFiltre = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const type = this.typeSelected();

    return this.pokemonList()
      .filter(pokemon =>
        pokemon.name.toLowerCase().includes(search)
      )
      .filter(pokemon =>
        !type || pokemon.types.includes(type)
      );
  });

  readonly loading = computed(() => this.pokemonList().length === 0);

  filterByType(type: string): void {
    const newType = this.typeSelected() === type ? null : type;
    this.typeSelected.set(newType);
  }

  removePokemon(pokemon: Pokemon): void {
    // Call the service to remove the Pokémon, or handle removal logic in the service
  //  this.#pokemonService.removePokemon(pokemon.id);
  }

  size(un_pokemon: Pokemon): string {
    if (un_pokemon.life <= 15) return 'Petit';
    if (un_pokemon.life >= 30) return 'Grand';
    return 'Moyen';
  }
}
