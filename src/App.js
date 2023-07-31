import "./App.css";
import "./components/styles.css";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import Main from "./components/Main";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";

function App() {
  return (
    <HashRouter>
      <>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/:category" element={<PokemonDetail />} />
        </Routes>
      </>
    </HashRouter>
  );
}

export default App;