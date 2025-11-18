import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { countriesAPI } from './API/countriesAPI'
import { empleadosAPI } from './API/empleadosAPI'

export const store = configureStore({
  reducer: {
    [countriesAPI.reducerPath]: countriesAPI.reducer,
    [empleadosAPI.reducerPath]: empleadosAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      countriesAPI.middleware,
      empleadosAPI.middleware
    ),
})

setupListeners(store.dispatch)
