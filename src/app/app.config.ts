import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthGward } from './core/auth/auth.gward';
import { LoginComponent } from './login/login.component';
import { PokemonAddComponent } from './pokemon/pokemon-add/pokemon-add.component';
import { environment } from '../environments/environment';
import { PokemonLocalStorageService } from './srcpokemon-local-storage.service';
import { PokemonJSONServerService } from './pokemon-json-server.service';
import { PokemonService } from './pokemon.service';

export function pokemonServiceFactory(): PokemonService {
  return environment.production
    ? new PokemonLocalStorageService()
    : new PokemonJSONServerService();
}

const routes : Routes = [

  {
    path:'login',
    component:LoginComponent,
    title:'connexion'
  },

  {
  path: 'pokemons',
  canActivateChild:[AuthGward],
  children:[

    {path:'add',
   component: PokemonAddComponent,
    title:'ajout ',
  
    
  },
    {path:'edit/:id',
   component: PokemonEditComponent, 
   title:'edition',
   
  },


{path:':id',
   component: PokemonProfileComponent,
    title:'pokémons',
  
    
  },
  {path:'add',
   component: PokemonAddComponent,
    title:'ajout',
  
    
  },

{ path:'', 
  component : PokemonListComponent,
  title: 'pokédex',

},

  ],
},



{path :'', redirectTo:'/pokemons', pathMatch:'full'},
{path:'**', component : PageNotFoundComponent}
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(),


  {
      provide: PokemonService,
      useFactory: pokemonServiceFactory,
    },
  ]
};
