import { apiSlice } from "../api/apiSlice";

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getconversations: builder.query({
            query: (email) => `/conversations?participants_like=${email}&_sort=timestapm&_order=desc&page=1&limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`
        })
    })
})

export const {
    useGetconversationsQuery
} = conversationsApi