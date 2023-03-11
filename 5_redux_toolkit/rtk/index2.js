const store = require('./app/store');
const { dynamicCounterActions } = require('./features/dynamicCounter/dynamicCounterSlice');

// subscribe to state change
store.subscribe(() => {
    console.log(store.getState());
})

// dispatch actions
store.dispatch(dynamicCounterActions.increment(2));
store.dispatch(dynamicCounterActions.decrement(1));