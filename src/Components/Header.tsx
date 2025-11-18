import { NavLink } from "react-router-dom";
const Header = () => {
    return (
        <div>
            <nav className="bg-[#0D1117] w-full border-b-2 border-blue-900 shadow-lg">
                <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl text-blue-400 font-bold whitespace-nowrap">
                            EXPLORER
                        </span>
                    </a>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden 
                       hover:bg-blue-900 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 
                       transition duration-200"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-blue-900 rounded-lg bg-gray-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
                            <li>
                                {/* ENLACE DE PAISES */}
                                <NavLink
                                    to="/"
                                    end
                                    className={({ isActive }) =>
                                        `block py-2 px-3 rounded md:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 transition duration-200 
                            ${isActive ? 'text-blue-400 font-bold' : 'text-gray-200 hover:bg-blue-800 md:hover:bg-transparent'}`
                                    }
                                    aria-current="page"
                                >
                                    Paises
                                </NavLink>
                            </li>
                            <li>
                                {/* ENLACE DE FORMULARIO */}
                                <NavLink
                                    to="/comentarios"
                                    className={({ isActive }) =>
                                        `block py-2 px-3 rounded md:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 transition duration-200
                            ${isActive ? 'text-blue-400 font-bold' : 'text-gray-200 hover:bg-blue-800 md:hover:bg-transparent'}`
                                    }
                                >
                                    Formulario
                                </NavLink>
                            </li>
                            <li>
                                {/* ENLACE DE EMPLEADOS */}
                                <NavLink
                                    to="/empleados"
                                    className={({ isActive }) =>
                                        `block py-2 px-3 rounded md:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 transition duration-200
                            ${isActive ? 'text-blue-400 font-bold' : 'text-gray-200 hover:bg-blue-800 md:hover:bg-transparent'}`
                                    }
                                >
                                    Empleados
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Header;
