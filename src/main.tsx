import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { store } from './store.ts'
import 'flowbite';
import { EmpleadoProvider } from './context/EmpleadosProvaider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <EmpleadoProvider>
        <App />
      </EmpleadoProvider>
    </Provider>
  </StrictMode>,
)
