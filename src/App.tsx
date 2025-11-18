import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Prueba from './layout/Prueba'
import PaisesInfo from './pages/PaisesInfo'
import Comentarios from './pages/Comentarios'
import AdministrarEmpleado from './pages/AdministrarEmpleado'
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Prueba/>}>
            <Route index element={<PaisesInfo/>} />
            <Route path='comentarios' element={<Comentarios/>} />
            <Route path='empleados' element={<AdministrarEmpleado/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
