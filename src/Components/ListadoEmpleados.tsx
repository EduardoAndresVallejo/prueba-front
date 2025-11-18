import useEmpleados from '../hooks/useEmpleados';
import Empleados from './Empleado';

const ListadoEmpleados = () => {
    const { empleados } = useEmpleados(); 

    if (!empleados || empleados.length === 0) {
        return (
            <>
                <div className="p-6 bg-gray-900 rounded-xl border-2 border-blue-900 shadow-xl">
                    <h2 className="font-black text-3xl text-center text-blue-400">No hay Empleados Registrados</h2>
                    <p className="text-xl mt-5 mb-3 text-center text-gray-300">
                        Comienza agregando empleados y <span className="text-blue-400 font-bold">aparecerán en este lugar</span>
                    </p>
                </div>
            </>
        );
    }

    return (
        <>
            <div>
                <h2 className="font-black text-3xl text-center text-blue-400">Listado Empleados</h2>

                <p className="text-xl mt-5 mb-10 text-center text-gray-300">
                    Administra tus Empleados <span className="text-blue-400 font-bold"></span>
                </p>
                <div className='max-h-[75vh] overflow-y-scroll custom-scrollbar scrollbar scrollbar-thumb-blue-600 scrollbar-track-gray-800 scrollbar-thin'>
                    {empleados.map((emp) => (
                    <div key={emp.id} className="mb-6 ">
                        <Empleados
                            empleado={emp}
                        />
                    </div>
                ))}
                </div>
            </div>
        </>
    );
};

export default ListadoEmpleados;
