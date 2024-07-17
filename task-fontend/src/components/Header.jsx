import { TiChartLine } from "react-icons/ti";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="text-gray-600 body-font shadow">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link to={"/"} className="flex cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <TiChartLine className="size-10 text-blue-500" />
                    <span className="ml-3 text-xl">Grow With Us</span>
                </Link>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link to={"/"} className="mr-5 hover:text-gray-900 cursor-pointer">First Link</Link>
                    <Link to={"/"} className="mr-5 hover:text-gray-900 cursor-pointer">Second Link</Link>
                    <Link to={"/"} className="mr-5 hover:text-gray-900 cursor-pointer">Third Link</Link>
                    <Link to={"/"} className="mr-5 hover:text-gray-900 cursor-pointer">Fourth Link</Link>
                </nav>
                <Link to={"login"} className="inline-flex text-white items-center bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 transition-all duration-200 rounded text-base mt-4 md:mt-0">Login

                </Link>
            </div>
        </header>
    )
}

export default Header
