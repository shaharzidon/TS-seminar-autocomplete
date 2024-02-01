import "./App.css";
import { Autocomplete } from "./components/autocomplete";
import { pokemon } from "./mock.data";

function App() {
  return (
    <div     
    className="flex flex-col gap-4 justify-start items-start w-full h-full"
    >
      <h1>My Awsome Pokemon Selector</h1>
      <Autocomplete
        options={pokemon}
        getOptionLabel={(p) => p.name}
        getOptionID={(p) => p.pokedexEntryNumber.toString()}
        filterFunction={(p, s) =>
          p.name.toLocaleLowerCase().includes(s.toLocaleLowerCase())
        }
        isMulti={true}
        onChange={(p) => console.log(p)}
      />
    </div>
  );
}

export default App;
