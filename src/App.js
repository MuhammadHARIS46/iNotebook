import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home";
import About from "../src/components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert message="This is me the one and only Haris"/>
        <div className="container">
          <Routes>
            <Route path="/" exact element={<Home />} />
          </Routes>

          <Routes>
            <Route path="/about" exact element={<About />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;