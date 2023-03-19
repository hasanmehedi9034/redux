import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000',
    }),
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
            keepUnusedDataFor: 120
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
    }),
});

export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery } = apiSlice

