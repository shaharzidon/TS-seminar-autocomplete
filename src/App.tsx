import "./App.css";
import { Pokemon } from "./mock.data";

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
    </div>
  );
}

export default App;
