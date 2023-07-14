import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loadinganimation.json";
import axios from "axios";
import { useEffect, useState } from "react";

const Memes = () => {
    const [currentDataIndex, setCurrentDataIndex] = useState(0);
    const [data, setData] = useState([]);

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
        }
    };
    // const randomIndex = Math.floor(Math.random() * data.length);
    return (
        <>
            <div className="flex flex-col justify-center items-center bg-gray-500">
                <img
                    className="border-2  max-w-xl "
                    src={data[currentDataIndex].url}
                />
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
