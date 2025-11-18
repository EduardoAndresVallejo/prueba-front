import useEmpleados from "../hooks/useEmpleados"
import type { Empleado } from "../interface/empleado"

interface Props {
    empleado: Empleado
}

const Empleados = ({ empleado }: Props) => {

    const { setEdicion, eliminarEmpleado } = useEmpleados()

    const { email, cedula, nombre, sueldo, id, telefono, direccion } = empleado

    return (
        <div className="mx-5 my-10 bg-gray-900 shadow-2xl px-3 py-8 rounded-xl border-2 border-blue-900 
            transform transition duration-300 hover:shadow-blue-500/30 hover:scale-[1.01]">

            {/* Contenido */}
            <p className="font-bold uppercase text-gray-300 my-3 border-b border-gray-700 pb-1">Nombre:
                <span className="font-normal normal-case text-blue-400 ml-2"> {nombre}</span>
            </p>

            <p className="font-bold uppercase text-gray-300 my-3 border-b border-gray-700 pb-1">Email:
                <span className="font-normal normal-case text-blue-400 ml-2"> {email}</span>
            </p>

            <p className="font-bold uppercase text-gray-300 my-3 border-b border-gray-700 pb-1">DNI:
                <span className="font-normal normal-case text-blue-400 ml-2">{cedula}</span>
            </p>

            <p className="font-bold uppercase text-gray-300 my-3 border-b border-gray-700 pb-1">Sueldo:
                <span className="font-normal normal-case text-blue-400 ml-2"><span className="text-white">$</span>{sueldo}</span>
            </p>

            <p className="font-bold uppercase text-gray-300 my-3 border-b border-gray-700 pb-1">Teléfono:
                <span className="font-normal normal-case text-blue-400 ml-2"> {telefono}</span>
            </p>

            <p className="font-bold uppercase text-gray-300 my-3 border-b border-gray-700 pb-1">Dirección:
                <span className="font-normal normal-case text-blue-400 ml-2"> {direccion}</span>
            </p>

            {/* Botones */}
            <div className="flex justify-between sm:flex-col my-7 gap-4">
                <button
                    type="button"
                    className="cursor-pointer py-2 px-10 bg-blue-600 hover:bg-blue-500 text-white uppercase font-bold rounded-lg shadow-lg shadow-blue-600/50 transition-colors"
                    onClick={() => setEdicion(empleado)}
                >
                    Editar
                </button>

                <button
                    type="button"
                    className="cursor-pointer py-2 px-10 bg-red-600 hover:bg-red-500 text-white uppercase font-bold rounded-lg shadow-lg shadow-red-600/50 transition-colors"
                    onClick={() => eliminarEmpleado(id!)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Empleados
