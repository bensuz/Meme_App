import { Route, Routes } from "react-router-dom";
import "./App.css";
import Memes from "./components/Memes";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Footer from "./components/Footer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Memes />} />

                    <Route path="/About" element={<About />} />
                </Routes>
                <Footer />
            </>
        </DndProvider>
    );
}

export default App;
