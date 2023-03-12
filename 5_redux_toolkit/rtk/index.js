const store = require('./app/store');
const { counterActions } = require('./features/counter/counterSlice');
const {fetchPosts} = require('./features/post/postSlice')

// subscribe to state change
store.subscribe(() => {
    // console.log(store.getState());

})

// dispatch actions
// store.dispatch(counterActions.increment());
// store.dispatch(counterActions.decrement());
// store.dispatch(counterActions.increment());
store.dispatch(fetchPosts());