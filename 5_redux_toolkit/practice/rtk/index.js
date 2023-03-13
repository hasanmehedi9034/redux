const store = require('./app/store');
const { counterActions } = require('./features/counter/counter');

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(counterActions.increment());
store.dispatch(counterActions.increment());
store.dispatch(counterActions.decrement());