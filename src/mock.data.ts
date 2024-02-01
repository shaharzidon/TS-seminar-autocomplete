export type Pokemon = {
  type: string;
  isLegendary: boolean;
  name: string;
  pokedexEntryNumber: number;
};

export const pokemons: Pokemon[] = [
  {
    type: "Fire",
    isLegendary: false,
    name: "Charmander",
    pokedexEntryNumber: 4,
  },
  {
    type: "Water",
    isLegendary: false,
    name: "Squirtle",
    pokedexEntryNumber: 7,
  },
  {
    type: "Grass",
    isLegendary: false,
    name: "Bulbasaur",
    pokedexEntryNumber: 1,
  },
  {
    type: "Electric",
    isLegendary: false,
    name: "Pikachu",
    pokedexEntryNumber: 25,
  },
  {
    type: "Psychic",
    isLegendary: true,
    name: "Mewtwo",
    pokedexEntryNumber: 150,
  },
  {
    type: "Dragon",
    isLegendary: true,
    name: "Rayquaza",
    pokedexEntryNumber: 384,
  },
  {
    type: "Ice",
    isLegendary: false,
    name: "Glaceon",
    pokedexEntryNumber: 471,
  },
  {
    type: "Fairy",
    isLegendary: false,
    name: "Sylveon",
    pokedexEntryNumber: 700,
  },
  {
    type: "Ghost",
    isLegendary: false,
    name: "Gengar",
    pokedexEntryNumber: 94,
  },
  {
    type: "Steel",
    isLegendary: true,
    name: "Dialga",
    pokedexEntryNumber: 483,
  },
];
