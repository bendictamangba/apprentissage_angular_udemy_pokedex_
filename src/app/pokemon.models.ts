export  interface Pokemon{

    id:number;
    name:string;
    picture:string;
    life:number;
    domage:number;
    type:[string] |[ string, string] | [string, string, string];
    created:Date;

}

export type PokemonList = Pokemon[];