// 1. version pokemon type with enum
export type Pokemon = {
  // optional - might be undefined
  isLegendary: any;
  name: any;
  pokedexEntryNumber: any;
  type: any;
};

//TypeScript enums allow grouping of related values, enhancing code readability
//and maintenance with named constants and controlled value sets.
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

// 9. use cont object as enums, allows more flexibility while still using types

// 2. generic Array type with Pokemon type - generics are like a variable but for types
export const pokemons: any = [
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
