import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Country } from '../interface/country'

export const countriesAPI = createApi({
    reducerPath: "countriesAPI",
    baseQuery: fetchBaseQuery({
    baseUrl: "https://studies.cs.helsinki.fi/restcountries/api"}),
    endpoints: (builder) => ({
        getcountries: builder.query<Country[], void>({
            query: () => "/all"
        })
    })

})

export const {useGetcountriesQuery} = countriesAPI