import { useState } from "react";

type ModalProps = {
    name: string;
    capital: string;
    region: string
    imagen: string
    maps: string
};


const Modal = ({ name, capital, region, imagen, maps }: ModalProps) => {

    const [view, setView] = useState(true)


    return (
        <div>
            <button
                data-modal-target="default-modal"
                onClick={() => setView(!view)}
                data-modal-toggle="default-modal"
                type="button"
                className="flex justify-center w-full text-white bg-blue-600 hover:bg-blue-500 
                   shadow-lg shadow-blue-500/50 
                   font-semibold rounded-lg text-sm my-6 px-4 py-2.5 
                   transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-800"
            >
                Mas Informacion
            </button>

            <div className={`${view ? 'hidden' : ''} flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-2rem)] h-screen px-50 bg-black/70`}>

                <div className="relative p-4 w-full max-w-lg max-h-full">

                    <div className="relative bg-[#0D1117] border-2 border-blue-900 rounded-xl shadow-2xl p-6">

                        <div className="flex items-center justify-between border-b border-blue-800 pb-4 mb-4">
                            <h3 className="text-2xl font-bold text-blue-400">
                                {name}
                            </h3>

                            <button
                                type="button"
                                onClick={() => setView(!view)}
                                className="text-gray-400 bg-transparent hover:bg-gray-700 hover:text-white 
                                   rounded-lg text-sm w-9 h-9 ms-auto inline-flex justify-center items-center 
                                   transition duration-200"
                                data-modal-hide="default-modal"
                            >
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" /></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="space-y-4 md:space-y-6 py-4">
                            <img
                                src={imagen}
                                className="w-full  object-cover m-auto rounded-lg mb-7 border-2 border-blue-600"
                                alt="Bandera"
                            />

                            <h1 className="text-xl font-bold text-gray-200 border-b border-gray-700 pb-1">
                                País: <span className="font-normal text-blue-400">{name}</span>
                            </h1>

                            <p className="text-xl font-bold text-gray-200 border-b border-gray-700 pb-1">
                                Capital: <span className="font-normal text-blue-400">{capital}</span>
                            </p>

                            <p className="text-xl font-bold text-gray-200 border-b border-gray-700 pb-1">
                                Region: <span className="font-normal text-blue-400">{region}</span>
                            </p>

                            <p className="text-xl font-bold text-gray-200 pt-2">
                                Ubicación:
                                <a
                                    href={maps}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-normal text-blue-400 hover:underline ml-2 transition duration-200"
                                >
                                    Link de Ubicacion por Google Maps
                                </a>
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Modal;
