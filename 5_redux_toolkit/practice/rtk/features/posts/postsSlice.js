const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    posts: [],
    loading: false,
    error: ''
}

const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    const posts = await response.json();
    return posts;
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            state.posts = action.payload
        })

        builder.addCase(fetchPosts.pending, (state, action) => {
            state.error = ''
            state.posts = ''
            state.loading = true
        })

        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.error = action.error.message
            state.posts = []
            state.loading = false
        })
    }
})

module.exports = postsSlice.reducer
module.exports.fetchPosts = fetchPosts