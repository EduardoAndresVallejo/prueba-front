import { useState, useEffect } from "react";
import Alertas from "./Alerta";
import useempleados from "../hooks/useEmpleados";
import type alertamsg from "../interface/alerta";
import { z } from "zod";

// 🔹 Esquema ZOD
const empleadoSchema = z.object({
    nombre: z.string().min(3, "El nombre es obligatorio"),
    email: z.string().email("Email inválido"),
    cedula: z.string().min(6, "La cédula es obligatoria"),
    sueldo: z.string().min(1, "El sueldo es obligatorio"),
    telefono: z.string().min(6, "El teléfono es obligatorio"),
    direccion: z.string().min(5, "La dirección es obligatoria"),
});

const Formulario = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [cedula, setCedula] = useState('');
    const [sueldo, setSueldo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [id, setId] = useState<number | null>(null);

    const [errores, setErrores] = useState<{ [key: string]: string }>({});

    const [alerta, setAlerta] = useState<alertamsg>({
        msg: "",
        error: false
    });

    const { guardarEmpleado, empleado } = useempleados();

    useEffect(() => {
        if (empleado?.nombre) {
            setNombre(empleado.nombre);
            setEmail(empleado.email);
            setCedula(String(empleado.cedula));
            setSueldo(String(empleado.sueldo));
            setTelefono(String(empleado.telefono));
            setDireccion(empleado.direccion);
            setId(empleado.id ?? null);
        }
    }, [empleado]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ✔ Validación con ZOD (ya no usamos el IF manual)
        const validacion = empleadoSchema.safeParse({
            nombre,
            email,
            cedula,
            sueldo,
            telefono,
            direccion
        });

        if (!validacion.success) {
            const erroresZod: any = {};
            validacion.error.issues.forEach(err => {
                erroresZod[err.path[0]] = err.message;
            });

            setErrores(erroresZod);

            setAlerta({
                msg: "Corrige los errores marcados",
                error: true
            });

            return;
        }

        setErrores({});

        const exito = await guardarEmpleado({
            id,
            nombre,
            email,
            cedula: Number(cedula),
            sueldo: Number(sueldo),
            telefono: Number(telefono),
            direccion
        })

        if (!exito.ok) {
            setAlerta({
                msg: exito.msg,
                error: true
            });
            return;
        }

        setAlerta({
            msg: exito.msg,
            error: false
        });

        setNombre('');
        setEmail('');
        setCedula('');
        setSueldo('');
        setTelefono('');
        setDireccion('');
        setId(null);
    };

    const { msg } = alerta;

    return (
        <>
            <div>
                <h2 className='font-black text-3xl text-center text-blue-400'>Administrador de empleados</h2>

                <p className='text-xl mt-5 mb-10 text-center text-gray-300'>
                    Añade tus empleados y Administralos
                </p>

                {msg && <Alertas alerta={alerta} />}

                <form
                    className='bg-gray-900 mt-15 py-10 px-5 mb-10 lg:mb-0 shadow-2xl rounded-xl border-2 border-blue-900'
                    onSubmit={handleSubmit}
                >

                    {/* NOMBRE */}
                    <div className='mb-5'>
                        <label htmlFor="nombre" className='text-gray-300 uppercase font-bold block mb-2'>
                            Nombre del empleado
                        </label>
                        <input
                            id='nombre'
                            type="text"
                            placeholder='Nombre del empleado'
                            className='border-2 w-full p-3 mt-2 bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg 
                           border-blue-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-colors'
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                        {errores.nombre && (
                            <p className="text-red-500 text-sm mt-1 font-medium">{errores.nombre}</p>
                        )}
                    </div>

                    {/* EMAIL */}
                    <div className='mb-5'>
                        <label htmlFor="email" className='text-gray-300 uppercase font-bold block mb-2'>
                            Email
                        </label>
                        <input
                            id='email'
                            type="email"
                            placeholder='Email del empleado'
                            className='border-2 w-full p-3 mt-2 bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg 
                           border-blue-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-colors'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {errores.email && (
                            <p className="text-red-500 text-sm mt-1 font-medium">{errores.email}</p>
                        )}
                    </div>

                    {/* SUELDO */}
                    <div className='mb-5'>
                        <label htmlFor="sueldo" className='text-gray-300 uppercase font-bold block mb-2'>
                            Sueldo
                        </label>
                        <input
                            id='sueldo'
                            type="number"
                            placeholder='Sueldo'
                            className='border-2 w-full p-3 mt-2 bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg 
                           border-blue-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-colors'
                            value={sueldo}
                            onChange={e => setSueldo(e.target.value)}
                        />
                        {errores.sueldo && (
                            <p className="text-red-500 text-sm mt-1 font-medium">{errores.sueldo}</p>
                        )}
                    </div>

                    {/* CEDULA */}
                    <div className='mb-5'>
                        <label htmlFor="cedula" className='text-gray-300 uppercase font-bold block mb-2'>
                            DNI
                        </label>
                        <input
                            id='cedula'
                            type="number"
                            placeholder='Cédula del empleado'
                            className='border-2 w-full p-3 mt-2 bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg 
                           border-blue-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-colors'
                            value={cedula}
                            onChange={e => setCedula(e.target.value)}
                        />
                        {errores.cedula && (
                            <p className="text-red-500 text-sm mt-1 font-medium">{errores.cedula}</p>
                        )}
                    </div>

                    {/* TELEFONO */}
                    <div className='mb-5'>
                        <label htmlFor="telefono" className='text-gray-300 uppercase font-bold block mb-2'>
                            Teléfono
                        </label>
                        <input
                            id='telefono'
                            type="number"
                            placeholder='Teléfono del empleado'
                            className='border-2 w-full p-3 mt-2 bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg 
                           border-blue-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-colors'
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
                        />
                        {errores.telefono && (
                            <p className="text-red-500 text-sm mt-1 font-medium">{errores.telefono}</p>
                        )}
                    </div>

                    <div className='mb-5'>
                        <label htmlFor="direccion" className='text-gray-300 uppercase font-bold block mb-2'>
                            Dirección
                        </label>
                        <input
                            id='direccion'
                            type="text"
                            placeholder='Dirección del empleado'
                            className='border-2 w-full p-3 mt-2 bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg 
                           border-blue-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-colors'
                            value={direccion}
                            onChange={e => setDireccion(e.target.value)}
                        />
                        {errores.direccion && (
                            <p className="text-red-500 text-sm mt-1 font-medium">{errores.direccion}</p>
                        )}
                    </div>

                    <input
                        type="submit"
                        className='bg-blue-600 w-full p-3 mt-5 text-white uppercase font-extrabold rounded-lg 
                       hover:bg-blue-500 cursor-pointer transition-colors shadow-lg shadow-blue-600/50'
                        value={id ? 'Guardar Cambios' : 'Agregar empleado'}
                    />
                </form>
            </div>
        </>
    );
}

export default Formulario;
