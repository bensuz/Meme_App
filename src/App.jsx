import { Route, Routes } from "react-router-dom";
import "./App.css";
import Memes from "./components/Memes";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Memes />} />
                <Route path="/About" element={<About />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
