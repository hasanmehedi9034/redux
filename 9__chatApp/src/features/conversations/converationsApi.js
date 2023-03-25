import { data } from "autoprefixer";
import { apiSlice } from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getconversations: builder.query({
            query: (email) => `/conversations?participants_like=${email}&_sort=timestapm&_order=desc&page=1&limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`
        }),
        getconversation: builder.query({
            query: ({userEmail, participantEmail}) => `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}&_sort=timestapm&_order=desc&page=1&limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`
        }),
        addConversation: builder.mutation({
            query: ({sender, data}) => ({
                url: '/conversations',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                const conversation = await queryFulfilled;
                if(conversation?.data.id) {
                    const users = arg.data.users;
                    const senderUser =  users.find(user =>  user.email === arg.sender)
                    const receiverUser =  users.find(user =>  user.email !== arg.sender)
                    // silent entry to message table
                    dispatch(messagesApi.endpoints.addMessage.initiate({
                        conversationId: conversation?.data.id,
                        sender: senderUser,
                        receiver: receiverUser,
                        message: arg.data.message,
                        timestamp: arg.data.timestamp
                    }))
                }
            }
        }),
        editConversation: builder.mutation({
            query: ({id, data, sender}) => ({
                url: `/conversations/${id}`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                const conversation = await queryFulfilled;
                if(conversation?.data.id) {
                    const users = arg.data.users;
                    const senderUser =  users.find(user =>  user.email === arg.sender)
                    const receiverUser =  users.find(user =>  user.email !== arg.sender)
                    // silent entry to message table
                    dispatch(messagesApi.endpoints.addMessage.initiate({
                        conversationId: conversation?.data.id,
                        sender: senderUser,
                        receiver: receiverUser,
                        message: arg.data.message,
                        timestamp: arg.data.timestamp
                    }))
                }
            }
        }),
    }),
})

export const {
    useGetconversationsQuery,
    useGetconversationQuery,
    useEditConversationMutation,
    useAddConversationMutation,
} = conversationsApi