const { configureStore } = require("@reduxjs/toolkit");
const counerReducer = require('../features/counter/counter')

const store = configureStore({
    reducer: {
        conunter: counerReducer,
    }
})

module.exports = store