import { useContext } from "react"
import PacientesContext from "../context/EmpleadosProvaider.js"

const useEmpleados = () => {
    return useContext(PacientesContext)
}

export default useEmpleados