import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loadinganimation.json";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

const Memes = () => {
    const [currentDataIndex, setCurrentDataIndex] = useState(0);
    const [data, setData] = useState([]);
    const [memes, setMemes] = useState({});
    const [userText, setUserText] = useState("");
    const [textPosition, setTextPosition] = useState("top-0");
    const [fontSize, setFontSize] = useState("xl");
    const [color, setColor] = useState("slate-600");

    const fetchData = async () => {
        setTimeout(async () => {
            try {
                const response = await axios.get(
                    "https://api.imgflip.com/get_memes"
                );
                setData(response.data.data.memes);
            } catch (error) {
                console.log(error);
            }
        }, 3000);
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(data);

    if (data.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl">Loading memes...</h2>
                <Lottie
                    animationData={loadingAnimation}
                    loop={true}
                    autoplay={true}
                    className="w-1/3"
                />
            </div>
        );
    }

    const handleNextMeme = () => {
        if (currentDataIndex < data.length - 1) {
            setCurrentDataIndex((prevIndex) => prevIndex + 1);
        } else {
            return <p>That is the last meme</p>;
        }
    };

    const handlePrevMeme = () => {
        if (currentDataIndex > 0) {
            setCurrentDataIndex((prevIndex) => prevIndex - 1);
            setMemes({
                ...memes,
                [currentDataIndex - 1]: {
                    meme: data[currentDataIndex - 1].name,
                    img: data[currentDataIndex - 1].url,
                    userText: { userText },
                    textPosition: { textPosition },
                    fontSize: { fontSize },
                    color: { color },
                },
            });
        }
    };

    const handleSubmit = () => {
        setMemes({
            ...memes,
            [currentDataIndex]: {
                meme: data[currentDataIndex].name,
                img: data[currentDataIndex].url,
                userText: userText,
                textPosition: textPosition,
                fontSize: fontSize,
                color: color,
            },
        });
    };
    const positionOptions = [
        { value: "top", label: "Top" },
        { value: "bottom", label: "Bottom" },
        { value: "center", label: "Center" },
    ];

    const fontOptions = [
        { value: "xl", label: "Small" },
        { value: "4xl", label: "Medium" },
        { value: "6xl", label: "Large" },
    ];

    const colorOptions = [
        { value: "slate-900", label: "Black" },
        { value: "red-600", label: "Red" },
        { value: "blue-600", label: "Blue" },
    ];
    // const randomIndex = Math.floor(Math.random() * data.length);

    return (
        <>
            <form
                className="flex items-center justify-center mb-5 space-x-5"
                action="submit"
            >
                <input
                    className="border-2 rounded-lg pl-2 p-0.5"
                    type="text"
                    value={userText}
                    onChange={(e) => setUserText(e.target.value)}
                    placeholder="Enter text"
                />
                <div className="flex space-x-5">
                    <Select
                        placeholder="Position"
                        options={positionOptions}
                        value={textPosition}
                        onChange={(e) => setTextPosition(e.value)}
                    ></Select>
                    <Select
                        placeholder="Font-Size"
                        options={fontOptions}
                        value={fontSize}
                        onChange={(selectedOption) =>
                            setFontSize(selectedOption.value)
                        }
                    ></Select>
                    <Select
                        placeholder="Color"
                        options={colorOptions}
                        value={color}
                        onChange={(selectedOption) =>
                            setColor(selectedOption.value)
                        }
                    ></Select>
                </div>
                <button
                    className="bg-slate-300 p-2 rounded-xl space-x-10 hover:bg-slate-600 hover:text-white"
                    onClick={handleSubmit}
                >
                    Save Meme
                </button>
            </form>

            <div className="flex flex-col justify-center items-center  relative">
                <img
                    className="border-2  max-w-xl "
                    src={data[currentDataIndex].url}
                />
                <div
                    className={`absolute left-0 w-full text-center ${
                        textPosition === "top"
                            ? "top-10"
                            : textPosition === "bottom"
                            ? "bottom-32"
                            : "top-1/2 transform -translate-y-1/2"
                    } text-${fontSize} text-${color} text-shadow-md`}
                >
                    {" "}
                    {userText}
                </div>

                <div className="flex space-x-8 mt-5">
                    <button
                        onClick={handlePrevMeme}
                        className={
                            currentDataIndex === 0
                                ? "hidden p-2.5 bg-purple-600 text-white hover:bg-purple-800 rounded-xl"
                                : "p-2.5 bg-purple-600 text-white hover:bg-purple-800 rounded-xl"
                        }
                    >
                        Previous Meme
                    </button>
                    <button
                        onClick={handleNextMeme}
                        className="p-2.5 bg-purple-600 text-white hover:bg-purple-800 rounded-xl"
                    >
                        {currentDataIndex === data.length - 1
                            ? "That!s All Folks!"
                            : "Next Meme"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Memes;
