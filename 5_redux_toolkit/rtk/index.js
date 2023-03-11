const store = require('./app/store');
const { counterActions } = require('./features/counter/counterSlice');

// subscribe to state change
store.subscribe(() => {
    console.log(store.getState());
})

// dispatch actions
store.dispatch(counterActions.increment());
store.dispatch(counterActions.decrement());