import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) => `/messages?conversationId=${id}&_sort=timestapm&_order=desc&page=1&limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`
        })
    })
})

export const {
    useGetMessagesQuery
} = messagesApi
