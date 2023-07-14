import logo from "../assets/img/logo.png";

const Footer = () => {
    return (
        <div>
            {" "}
            <hr className="w-1/2 h-0.5 bg-gray-300 mb-1 mt-11 mx-auto" />
            <hr className="w-full h-1 bg-gray-400 mb-1" />
            <div className="flex justify-around items-center p-3">
                <div className="flex items-center gap-4">
                    <img className="w-16" src={logo} alt="" />
                    <p className="text-lg">MEMELAND</p>
                </div>
                <p>All rights reserved. 2023 WBS Coding School.</p>
            </div>
        </div>
    );
};

export default Footer;
