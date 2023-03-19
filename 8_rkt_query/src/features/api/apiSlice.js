import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000',
    }),
    tagTypes: ['Videos'],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
            keepUnusedDataFor: 120,
            providesTags: ['Videos']
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`
        }),
        getRelatedVideos: builder.query({
            query: ({videoId, videoTitle}) => {
                const tags = videoTitle.split(' ');
                const likes = tags.map(tag => `title_like=${tag}`);
                const queryString = `/videos?${likes.join('&')}&_limit=4`;
                return queryString;
            }
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Videos']
        })
    }),
});

export const { useGetVideosQuery, useAddVideoMutation, useGetVideoQuery, useGetRelatedVideosQuery } = apiSlice

