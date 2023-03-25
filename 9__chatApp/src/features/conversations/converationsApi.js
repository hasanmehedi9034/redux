import { apiSlice } from "../api/apiSlice";

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getconversations: builder.query({
            query: (email) => `/conversations?participants_like=${email}&_sort=timestapm&_order=desc&page=1&limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`
        }),
        getconversation: builder.query({
            query: ({userEmail, participantEmail}) => `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}&_sort=timestapm&_order=desc&page=1&limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`
        }),

        addConversation: builder.mutation({
            query: (data) => ({
                url: '/conversations',
                method: 'POST',
                body: data
            })
        }),

        editConversation: builder.mutation({
            query: ({id, data}) => ({
                url: `/conversations/${id}`,
                method: 'PATCH',
                body: data
            })
        }),
    }),
})

export const {
    useGetconversationsQuery,
    useGetconversationQuery,
    useEditConversationMutation,
    useAddConversationMutation,
} = conversationsApi