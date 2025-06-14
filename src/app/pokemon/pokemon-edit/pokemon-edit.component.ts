import { Component, inject, signal } from '@angular/core';

import { PokemonService } from '../../pokemon.service';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Pokemon, getPokemonColor } from '../../pokemon.models'; // Importer le type Pokemon
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-pokemon-edit',
    standalone: true, 
  imports: [
             
    ReactiveFormsModule,  
    RouterLink,           
  ],
  templateUrl: './pokemon-edit.component.html',
  styles: ``,
})


export class PokemonEditComponent {


  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = signal(
    Number(this.route.snapshot.paramMap.get('id'))
  ).asReadonly();
  // Typer explicitement le signal pour plus de clarté
  readonly pokemon = signal<Pokemon | undefined>(
    this.pokemonService.getPokemonById(this.pokemonId())
  ).asReadonly();

get pokemonLink(): any[] {
  return ['/pokemons', this.pokemon()?.id];
}









  readonly form: FormGroup; // Déclarer le FormGroup ici

  constructor() {
    const currentPokemon = this.pokemon();

    // Initialiser le formulaire en vérifiant si currentPokemon existe
    this.form = new FormGroup({
      name: new FormControl(currentPokemon ? currentPokemon.name : ''),
      life: new FormControl(currentPokemon ? currentPokemon.life : 0),
      domage: new FormControl(currentPokemon ? currentPokemon.domage : 0),
      type: new FormArray(
        currentPokemon
          ? currentPokemon.type.map((type) => new FormControl(type))
          : []
      ),
    });
   
  console.log('Pokemon chargé :', currentPokemon);

  }

  get pokemonTypeList() : FormArray{
    return this.form.get('type') as FormArray;

    }


isPokemonTypeSelected(type: string): boolean {
    return !!this.pokemonTypeList.controls.some(
      (control) => control.value === type
    );
  
  }

  
onPokemonTypeChange(type: string, isChecked: boolean) {
    if (isChecked) {
      const control = new FormControl(type);
      this.pokemonTypeList.push(control);
      } else {
        const index = this.pokemonTypeList.controls
       .map((control) => control.value)
       .indexOf(type);
       this.pokemonTypeList.removeAt(index);
    }
  }


onSubmit(){
  console.log(this.form.value);
}

 getPokemonColor(type: string): string {
    return getPokemonColor(type);
  }




getChipTextColor (type: string):'black' | 'white'{

  return type === 'Electrik' ? 'black' : 'white';

}



}