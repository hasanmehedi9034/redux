const store = require('./app/store');
const { counterActions } = require('./features/counter/counter');
const { fetchPosts } = require('./features/posts/postsSlice');

store.subscribe(() => {
    console.log(store.getState())
})

// store.dispatch(counterActions.increment());
// store.dispatch(counterActions.increment());
// store.dispatch(counterActions.decrement());
store.dispatch(fetchPosts());