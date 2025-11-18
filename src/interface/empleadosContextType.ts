import type { Empleado } from "./empleado";

export type ResultadoGuardado = {
  ok: boolean;
  msg: string;
};


export interface EmpleadosContextType {
 empleados: Empleado[];
  empleado: Empleado | null;
  guardarEmpleado: (empleado: Empleado) => Promise<ResultadoGuardado>;
  setEdicion: (empleado: Empleado) => void;
  eliminarEmpleado: (id: number) => Promise<boolean>;

}
