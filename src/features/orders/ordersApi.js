import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
    reducerPath: 'orders',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    }),
    endpoints: (build) => ({
        getOrder: build.query({
            query: () => "/order"
        }),
        createOrder: build.mutation({
            query: (order) => ({
                url: "/order",
                method: "POST",
                body: order
            })
        }),
        updateOrderStatus: build.mutation({
            query: ({ id, status }) => ({
                url: `/order/${id}/status`, 
                method: "PATCH",
                body: { status }
            })
        }),
        getOrderByEmail: build.mutation({
            query: (email) => ({
                url: `/order/${email}`
            })
        }),
        deleteOrder: build.mutation({
            query: (id) => ({
                url: `/order/${id}`,
                method: 'DELETE',
            })
        })
    })
});

export const {
    useGetOrderQuery,
    useCreateOrderMutation,
    useUpdateOrderStatusMutation,
    useGetOrderByEmailMutation,
    useDeleteOrderMutation
} = ordersApi;
