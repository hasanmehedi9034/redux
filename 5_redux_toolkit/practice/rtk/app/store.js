const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
// const counerReducer = require('../features/counter/counter')
const postReducer = require('../features/posts/postsSlice')
const {createLogger} = require('redux-logger')

const store = configureStore({
    reducer: {
        // conunter: counerReducer,
        posts: postReducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), createLogger()]
})

module.exports = store