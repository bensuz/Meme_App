import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Navbar = () => {
    const handleAddMeme = () => {
        return <h1>Adding new meme</h1>;
    };

    return (
        <>
            <div className="flex justify-around items-center">
                <div className="flex  items-center space-x-5 ">
                    <img className="w-20" src={logo} alt="" />
                    <p className="text-2xl font-bold text-gray-600">MEMELAND</p>
                </div>
                <div className="flex  items-center space-x-10">
                    <NavLink className="text-xl" to="/">
                        Memes
                    </NavLink>
                    <NavLink className="text-xl" to="/about">
                        About
                    </NavLink>
                    <button
                        className="bg-purple-500 text-white text-base rounded-xl p-2.5 hover:bg-purple-800"
                        onClick={handleAddMeme}
                    >
                        Add Your Own Meme
                    </button>
                </div>
            </div>
            <hr className="w-full h-1 bg-gray-400 mb-1" />
            <hr className="w-1/2 h-0.5 bg-gray-300 mb-10 mx-auto" />
        </>
    );
};

export default Navbar;
