import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coffeesApi = createApi({
  reducerPath: "coffees",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  endpoints: (build) => ({
    getCoffees: build.query({
      query: () => "/coffees",
    }),
    
    // Change this to `build.query`
    getCoffeeById: build.query({
      query: (id) => `/coffees/${id}`,
    }),

    createCoffee: build.mutation({
      query: (coffee) => ({
        url: "/coffees",
        method: "POST",
        body: coffee,
      }),
    }),

    updateCoffee: build.mutation({
      query: ({ id, ...coffee }) => ({
        url: `/coffees/${id}`,
        method: "PUT",
        body: coffee,
      }),
    }),

    deleteCoffee: build.mutation({
      query: (id) => ({
        url: `/coffees/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCoffeesQuery,
  useGetCoffeeByIdQuery, // Corrected to query
  useCreateCoffeeMutation,
  useUpdateCoffeeMutation,
  useDeleteCoffeeMutation,
} = coffeesApi;
