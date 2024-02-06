// 1. v1 of pokemon type using enum
export type Pokemon = {
  // optional - might be undefined
  isLegendary: any;
  name: any;
  pokedexEntryNumber: any;
  type: any;
};

export enum PokemonTypes {
  Fire = "fire",
  Water = "water",
  Grass = "grass",
  Electric = "electric",
  Psychic = "psychic",
  Dragon = "dragon",
  Ice = "ice",
  Fairy = "fairy",
  Ghost = "ghost",
  Steel = "steel",
}

// 9. version 2, use strict enums, build a type for Pokemon type

// 2. Array type with generic Pokemon type - generics are like a variable but for types
export const pokemons: Array<Pokemon> = [
  {
    type: PokemonTypes.Fire,
    name: "Charmander",
    pokedexEntryNumber: 4,
  },
  {
    type: PokemonTypes.Water,
    name: "Squirtle",
    pokedexEntryNumber: 7,
  },
  {
    type: PokemonTypes.Grass,
    name: "Bulbasaur",
    pokedexEntryNumber: 1,
  },
  {
    type: PokemonTypes.Electric,
    isLegendary: false,
    name: "Pikachu",
    pokedexEntryNumber: 25,
  },
  {
    type: PokemonTypes.Psychic,
    isLegendary: true,
    name: "Mewtwo",
    pokedexEntryNumber: 150,
  },
  {
    type: PokemonTypes.Dragon,
    isLegendary: true,
    name: "Rayquaza",
    pokedexEntryNumber: 384,
  },
  {
    type: PokemonTypes.Ice,
    name: "Glaceon",
    pokedexEntryNumber: 471,
  },
  {
    type: PokemonTypes.Fairy,
    isLegendary: false,
    name: "Sylveon",
    pokedexEntryNumber: 700,
  },
  {
    type: PokemonTypes.Ghost,
    isLegendary: false,
    name: "Gengar",
    pokedexEntryNumber: 94,
  },
  {
    type: PokemonTypes.Steel,
    isLegendary: true,
    name: "Dialga",
    pokedexEntryNumber: 483,
  },
];
