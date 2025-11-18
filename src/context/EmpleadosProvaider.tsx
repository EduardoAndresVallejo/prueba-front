import { createContext, useState } from "react";
import type { Empleado } from "../interface/empleado";
import {
  useGetEmpleadosQuery,
  useCrearEmpleadoMutation,
  useEditarEmpleadoMutation,
  useEliminarEmpleadoMutation
} from "../API/empleadosAPI";
import type { EmpleadosContextType } from "../interface/empleadosContextType";

type ResultadoGuardado = {
  ok: boolean;
  msg: string;
};


const EmpleadoContext = createContext<EmpleadosContextType>({
  empleados: [],
  empleado: null,
  guardarEmpleado: async () => ({ ok: false, msg: "no provider" }),
  setEdicion: () => { },
  eliminarEmpleado: async () => false
});

export const EmpleadoProvider = ({ children }: { children: React.ReactNode }) => {
  const [empleado, setEmpleado] = useState<Empleado | null>(null);
  const { data: empleados = [] } = useGetEmpleadosQuery();
  const [crearEmpleado] = useCrearEmpleadoMutation();
  const [editarEmpleado] = useEditarEmpleadoMutation();
  const [borrarEmpleado] = useEliminarEmpleadoMutation();

  const guardarEmpleado = async (
    empleadoData: Empleado
  ): Promise<ResultadoGuardado> => {

    try {
      if (empleadoData.id) {
        await editarEmpleado(empleadoData).unwrap();
      } else {
        await crearEmpleado(empleadoData).unwrap();
      }

      return { ok: true, msg: "Guardado correctamente" };

    } catch (error: any) {
      const msg =
        error?.data?.msg ||  
        "Estas usando ";
      return { ok: false, msg };
    }
  };

  const eliminarEmpleado = async (id: number): Promise<boolean> => {
    try {
      await borrarEmpleado(id).unwrap();
      return true;
    } catch (error) {
      console.error("Error eliminando empleado:", error);
      return false;
    }
  };

  const setEdicion = (empleado: Empleado) => {
    setEmpleado(empleado);
  };

  return (
    <EmpleadoContext.Provider
      value={{
        empleados,
        empleado,
        guardarEmpleado,
        setEdicion,
        eliminarEmpleado
      }}
    >
      {children}
    </EmpleadoContext.Provider>
  );
};

export default EmpleadoContext;
