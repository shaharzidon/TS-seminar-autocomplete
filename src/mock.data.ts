export type Pokemon = {
  type: string;
  isLegendary?: boolean;
  name: string;
  pokedexEntryNumber: number;
};

enum Types {
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

export const pokemons: Pokemon[] = [
  {
    type: Types.Fire,
    name: "Charmander",
    pokedexEntryNumber: 4,
  },
  {
    type: Types.Water,
    name: "Squirtle",
    pokedexEntryNumber: 7,
  },
  {
    type: Types.Grass,
    name: "Bulbasaur",
    pokedexEntryNumber: 1,
  },
  {
    type: Types.Electric,
    isLegendary: false,
    name: "Pikachu",
    pokedexEntryNumber: 25,
  },
  {
    type: Types.Psychic,
    isLegendary: true,
    name: "Mewtwo",
    pokedexEntryNumber: 150,
  },
  {
    type: Types.Dragon,
    isLegendary: true,
    name: "Rayquaza",
    pokedexEntryNumber: 384,
  },
  {
    type: Types.Ice,
    name: "Glaceon",
    pokedexEntryNumber: 471,
  },
  {
    type: Types.Fairy,
    isLegendary: false,
    name: "Sylveon",
    pokedexEntryNumber: 700,
  },
  {
    type: Types.Ghost,
    isLegendary: false,
    name: "Gengar",
    pokedexEntryNumber: 94,
  },
  {
    type: Types.Steel,
    isLegendary: true,
    name: "Dialga",
    pokedexEntryNumber: 483,
  },
];
