import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const Prueba = () => {

    return (
        <>
            <Header/>
            <main className=" bg-[#0D1117] min-h-screen">
                <Outlet />
            </main>
        </>
    );
}

export default Prueba;