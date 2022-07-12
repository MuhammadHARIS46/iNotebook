import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home";
import About from "../src/components/About";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
        </Routes>

        <Routes>
          <Route path="/about" exact element={<About />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
