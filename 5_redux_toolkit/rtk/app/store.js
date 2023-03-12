const {configureStore} = require('@reduxjs/toolkit');
const counterReducer = require('../features/counter/counterSlice')
const dynamicCounter = require('../features/dynamicCounter/dynamicCounterSlice')
const {createLogger} = require('redux-logger')
const postReducer = require('../features/post/postSlice')

const logger = createLogger();

// configure store
const store = configureStore({
    reducer: {
        counter: counterReducer,
        dynamiccounter: dynamicCounter,
        post: postReducer
    },
    middleware: (getDefaultMiddlewares) => [...getDefaultMiddlewares(), logger]
})


module.exports = store;
