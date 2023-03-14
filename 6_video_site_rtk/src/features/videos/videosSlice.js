import { getVideos } from "./videosAPI.js"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    videos: [],
    isLoading: false,
    isError: false,
    error: ''
}

export const fetchVideos = createAsyncThunk(
    'videos/fetchVideos',
    async () => {
        const videos = await getVideos();
        return videos;
    }
)

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //for videos
        builder
        .addCase(fetchVideos.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(fetchVideos.fulfilled, (state, action) => {
            state.isLoading = false
            state.videos = action.payload
        })
        .addCase(fetchVideos.rejected, (state, action) => {
            state.isLoading = false
            state.videos = []
            state.isError = action.error?.message
        })
    }
})

export default videosSlice.reducer;

