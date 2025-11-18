import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const empleadosAPI = createApi({
  reducerPath: "empleadosAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://natural-illumination-production-7ac1.up.railway.app/api",
    validateStatus: (response, _) => {
      return response.status >= 200 && response.status < 300;
    }
  }),
  tagTypes: ["Empleados"],
  endpoints: (builder) => ({
    getEmpleados: builder.query<any, void>({
      query: () => "/empleados",
      providesTags: ["Empleados"],
    }),

    crearEmpleado: builder.mutation({
      query: (empleado) => ({
        url: "/empleados",
        method: "POST",
        body: empleado,
      }),
      invalidatesTags: ["Empleados"],
    }),

    editarEmpleado: builder.mutation({
      query: (empleado) => ({
        url: `/empleados/${empleado.id}`,
        method: "PUT",
        body: empleado,
      }),
      invalidatesTags: ["Empleados"],
    }),

    eliminarEmpleado: builder.mutation({
      query: (id) => ({
        url: `/empleados/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Empleados"],
    }),
  }),
});

export const {
  useGetEmpleadosQuery,
  useCrearEmpleadoMutation,
  useEditarEmpleadoMutation,
  useEliminarEmpleadoMutation,
} = empleadosAPI;
