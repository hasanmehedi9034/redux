import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // for new account
        register: builder.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try{
                    const result = await queryFulfilled;
                    localStorage.setItem('auth', JSON.stringify(result.data))
                    dispatch(userLoggedIn(result.data))
                }
                catch(error) {}
            }
        }),

        // for login
        login: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try{
                    const result = await queryFulfilled;
                    localStorage.setItem('auth', JSON.stringify(result.data))
                    dispatch(userLoggedIn(result.data))
                }
                catch(error) {}
            }
        }),
    })
})

export const {
    useLoginMutation, 
    useRegisterMutation
} = authApi;