import { Component, effect, inject, signal } from '@angular/core';

import { PokemonService } from '../../pokemon.service';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { POKEMON_RULES, getPokemonColor } from '../../pokemon.models'; 
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-pokemon-edit',
  imports: [   
    ReactiveFormsModule,  
    RouterLink,    
    
           
  ],
  templateUrl: './pokemon-edit.component.html',
  styles: ``,
})


export class PokemonEditComponent {
    readonly router = inject(Router);

  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = Number(
    this.route.snapshot.paramMap.get('id'));  
  readonly pokemon = toSignal(
    this.pokemonService.getPokemonById(this.pokemonId)
  );

  readonly POKEMON_RULES = POKEMON_RULES;


  readonly form = new FormGroup({
  name: new FormControl('',
    [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN)
    ]
  ),
 
 life: new FormControl(),
  domage: new FormControl(),
  types: new FormArray([],
  
    [Validators.required,
      Validators.maxLength(POKEMON_RULES.MAX_TYPES),
      Validators.minLength(POKEMON_RULES.MIN_TYPES)
    ]
  ),
  });

  constructor(){
   effect(()=>{
    const pokemon = this.pokemon();
    if(pokemon){
      this.form.patchValue({
        name: pokemon.name,
        life: pokemon.life,
        domage: pokemon.domage,

      });
      pokemon.types.forEach((types) => {
        this.pokemonTypeList.push(new FormControl(types));
      });
    
    }
  });
}


  



  get pokemonTypeList() : FormArray{
    return this.form.get('types') as FormArray;

    }

  get pokemonName() : FormControl{
    return this.form.get('name') as FormControl;

    }

    get pokemonLife() : FormControl{
    return this.form.get('life') as FormControl;

    }
    incrementeLife(){
      const newValue = this.pokemonLife.value + 1;
      this.pokemonLife.setValue(newValue);

    }

      decrementeLife(){
      const newValue = this.pokemonLife.value - 1;
      this.pokemonLife.setValue(newValue);

    }

    incrementeDomage(){
      const newValue = this.pokemonLife.value + 1;
      this.pokemonDomage.setValue(newValue);

    }

      decrementeDomage(){
      const newValue = this.pokemonLife.value - 1;
      this.pokemonDomage.setValue(newValue);

    }

    get pokemonDomage() : FormControl{
    return this.form.get('domage') as FormControl;

    }







isPokemonTypeSelected(type: string): boolean {
    return !!this.pokemonTypeList.controls.some(
      (control) => control.value === type
    );
  
  }

  
onPokemonTypeChange(types: string, isChecked: boolean) {
    if (isChecked) {
      const control = new FormControl(types);
      this.pokemonTypeList.push(control);
      } else {
        const index = this.pokemonTypeList.controls
       .map((control) => control.value)
       .indexOf(types);
       this.pokemonTypeList.removeAt(index);
    }
  }


onSubmit(){
 const isFormValid = this.form.valid;
 const pokemon = this.pokemon();

 if (isFormValid && pokemon){

  const updatePokemon = {
    ...pokemon,
    name: this.pokemonName.value,
    life: this.pokemonLife.value,
    domage: this.pokemonDomage.value,
    types: this.pokemonTypeList.value,
  };

  this.pokemonService.updatePokemon(updatePokemon).subscribe(()=>{
    this.router.navigate(['/pokemons', pokemon.id]);
  }
  );
 }
}





 getPokemonColor(type: string): string {
    return getPokemonColor(type);
  }




getChipTextColor (types: string):'black' | 'white'{

  return types === 'Electrik' ? 'black' : 'white';

}



}