import { apiSlice } from "../../apis/apiSlice";
import { logout, setCredentials } from "../slices/authSlice";


export const authApiService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation({
            query: credentails => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentails }
            })
        }),

        signup: builder.mutation({
            query: credentials => ({
                url: '/auth/signup',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'GET'
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                await queryFulfilled
                dispatch(logout())
                setTimeout(() => {
                    dispatch(apiSlice.util.resetApiState())
                }, 1000)
            }
        }),

        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET'
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled
                const { accessToken } = data
                dispatch(setCredentials({ accessToken }))
            }
        })

    })
})

export const {
    useLoginMutation,
    useSignupMutation,
    useSendLogoutMutation,
    useRefreshMutation
} = authApiService