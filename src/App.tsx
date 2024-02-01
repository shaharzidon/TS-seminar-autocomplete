import "./App.css";
import { Autocomplete } from "./components/autocomplete";
import { pokemon } from "./mock.data";

function App() {
  return (
    <div
      id="root"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        justifyContent: "start",
        alignItems: "start",
        width: "100%",
        height: "100%",
      }}
    >
      <h1>My Awsome Pokemon Selector</h1>
      <Autocomplete
        options={pokemon}
        getOptionLabel={(p) => p.name}
        getOptionID={(p) => p.pokedexEntryNumber.toString()}
        filterFunction={(p, s) => p.name.includes(s)}
        isMulti={false}
        onChange={(p) => console.log(p)}
      />
    </div>
  );
}

export default App;
