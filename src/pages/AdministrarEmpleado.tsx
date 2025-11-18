import { useState } from 'react';
import Formulario from '../Components/Formulario';
import ListadoEmpleados from '../Components/ListadoEmpleados';

const AdministrarEmpleado = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    return (
        <div className="flex flex-col md:flex-row bg-[#0D1117] p-5">
    <button 
        type="button"
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase mx-10 p-3 rounded-lg mb-10 md:hidden cursor-pointer 
                   transition duration-200 shadow-lg shadow-blue-600/50"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
    >{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario' }</button>
    
    <div className={`${mostrarFormulario ? 'block': 'hidden'} md:block md:w-1/2 lg:w-2/5 p-4`}>
        <Formulario />
    </div>
    
    <div className="md:w-1/2 lg:w-3/5 p-4">
        <ListadoEmpleados />
    </div>
</div>
    );
}

export default AdministrarEmpleado;
