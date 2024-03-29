import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000',
    }),
    tagTypes: ['Videos', 'Video', 'RelatedVideos'],
    endpoints: (builder) => ({

        //for fetching  all videos
        getVideos: builder.query({
            query: () => '/videos',
            keepUnusedDataFor: 120,
            providesTags: ['Videos']
        }),

        // for fetching single video
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
            providesTags: (result, error, arg) => [
                {
                    type: 'Video',
                    id: arg
                }
            ]
        }),

        // for fetching related all videos
        getRelatedVideos: builder.query({
            query: ({ videoId, videoTitle }) => {
                const tags = videoTitle.split(' ');
                const likes = tags.map(tag => `title_like=${tag}`);
                const queryString = `/videos?${likes.join('&')}&_limit=4`;
                return queryString;
            },
            providesTags: (result, error, arg) => [
                {
                    type: 'RelatedVideos',
                    id: arg.videoId
                }
            ]
        }),

        // for adding a video
        addVideo: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Videos']
        }),

        // for update a video
        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [
                'Videos',
                {
                    type: 'Video',
                    id: arg.id
                },
                {
                    type: 'RelatedVideos',
                    id: arg.id
                }
            ]
        }),

        // for deleting video
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                'Videos',
            ]
        }),
    }),
});

export const { 
    useDeleteVideoMutation, 
    useEditVideoMutation, 
    useGetVideosQuery, 
    useAddVideoMutation, 
    useGetVideoQuery, 
    useGetRelatedVideosQuery 
} = apiSlice

