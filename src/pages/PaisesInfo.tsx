import { useGetcountriesQuery } from "../API/countriesAPI"
import { useEffect, useState } from "react"
import type { Country } from "../interface/country"
import Modal from "../Components/Modal"
import Loading from "../Components/Loading"

function PaisesInfo() {
  const { data } = useGetcountriesQuery()
  const [busqueda, setBusqueda] = useState("")
  const [pagina, setPagina] = useState(1)
  const porPagina = 20
  const [debouncedBusqueda, setDebouncedBusqueda] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const handler = setTimeout(() => {
      setDebouncedBusqueda(busqueda);
      setLoading(false)
    }, 1000);

    return () => clearTimeout(handler);
  }, [busqueda]);



  const filtrar =
    data?.filter((pais) =>
      pais.name.common.toLowerCase().includes(debouncedBusqueda.toLowerCase())
    ) ?? [];

  const inicio = (pagina - 1) * porPagina
  const fin = inicio + porPagina
  const visibles = filtrar?.slice(inicio, fin)

  const totalPaginas = Math.ceil(filtrar.length / porPagina)


  return (
    <>
      <div className="pt-20 bg-[#0D1117] min-h-[150px] border-b border-blue-900 shadow-xl">
        <div className="flex flex-col w-80 px-7 mx-auto sm:mx-0 sm:ml-7">
          <label className="py-2 text-xl uppercase font-extrabold text-blue-400">
            Busca tu país
          </label>

          <input
            type="text"
            placeholder="Escribe el nombre de un país..."
            value={busqueda}
            onChange={(e) => { setBusqueda(e.target.value); setPagina(1) }}
            className="bg-gray-800 border-2 border-blue-600 rounded-lg p-3 w-full 
                 max-w-md text-gray-200 placeholder-gray-500 
                 transition duration-200 
                 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {loading ? <Loading /> : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {visibles?.map((paises: Country, index: number) => (
                <div key={index} className="flex-row m-4 max-w-sm">
                  <div
                    className="bg-[#0D1117] block border-2 border-blue-900 rounded-xl shadow-2xl 
                   transform transition-all duration-300 ease-in-out 
                   hover:shadow-blue-500/30"
                  >
                    <img
                      className="rounded-t-xl w-full h-48 object-cover border-b-4 border-blue-600"
                      src={paises.flags.png}
                      alt={`Bandera de ${paises.name.common}`}
                    />

                    <div className="p-6 text-center">

                      <h5 className="mt-2 mb-3 text-3xl font-bold tracking-tight text-blue-400">
                        {paises.name.common}
                      </h5>

                      <p className="text-lg text-gray-200 mb-6">
                        Descubre detalles clave e información adicional del país.
                      </p>

                      <Modal
                        imagen={paises.flags.png}
                        name={paises.name.common}
                        region={paises.region}
                        capital={paises.capital}
                        maps={paises.maps.googleMaps}
                      />

                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 items-center pt-4 pb-6 bg-[#0D1117] border-t-2 border-blue-900 rounded-b-xl">
              <button
                onClick={() => setPagina((p) => Math.max(p - 1, 1))}
                disabled={pagina === 1}
                className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg disabled:opacity-50 
                   hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 disabled:shadow-none"
              >
                ⬅️ Anterior
              </button>

              <span className="text-xl font-semibold text-gray-200">
                Página <span className="text-blue-400">{pagina}</span> de <span className="text-blue-400">{totalPaginas}</span>
              </span>

              <button
                onClick={() => setPagina((p) => Math.min(p + 1, totalPaginas))}
                disabled={pagina === totalPaginas}
                className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg disabled:opacity-50 
                   hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 disabled:shadow-none"
              >
                Siguiente ➡️
              </button>
            </div>
          </div>

        )}


        {visibles?.length === 0 && <p>No se encontraron países.</p>}
      </div>

    </>
  )
}

export default PaisesInfo