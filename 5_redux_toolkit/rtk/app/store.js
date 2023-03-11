const {configureStore} = require('@reduxjs/toolkit');
const counterReducer = require('../features/counter/counterSlice')
const dynamicCounter = require('../features/dynamicCounter/dynamicCounterSlice')

// configure store
const store = configureStore({
    reducer: {
        counter: counterReducer,
        dynamiccounter: dynamicCounter
    }
})


module.exports = store;
