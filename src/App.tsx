import "./App.css";
import { Autocomplete } from "./components/autocomplete";
import { Pokemon, pokemons } from "./mock.data";

const getPokemonOptionLabel = (pokemon: Pokemon) => pokemon.name;
const getPokemonOptionID = (pokemon: Pokemon) =>
  pokemon.pokedexEntryNumber.toString();
const pokemonFilterFunction = (pokemon: Pokemon, searchTerm: string) =>
  pokemon.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
const onPokemonsSelected = (pokemon: Pokemon[] | Pokemon) => {
  console.log({ pokemon });
};

function App() {
  return (
    <div className="flex flex-col gap-4 justify-start items-start w-full h-full">
      <h1>My Awsome Pokemon Selector</h1>
      <Autocomplete
        options={pokemons}
        getOptionLabel={getPokemonOptionLabel}
        getOptionID={getPokemonOptionID}
        filterFunction={pokemonFilterFunction}
        isMulti={true}
        onChange={onPokemonsSelected}
      />
    </div>
  );
}

export default App;
