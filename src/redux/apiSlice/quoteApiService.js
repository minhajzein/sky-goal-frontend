import { apiSlice } from "../../apis/apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

// =====================================================================

export const quoteApiService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuotes: builder.query({
            query: () => ({
                url: '/quotes',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            })
        })
    })
})