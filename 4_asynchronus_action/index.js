const {legacy_createStore: createStore, applyMiddleware} = require('redux');
const {delayAcctionMiddleware, fetchTodoMiddleware} = require('./middlewares')

// initial state
const initialState = {
    todos: []
}

// reducer
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'todos/todoAdded':
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        title: action.payload
                    }
                ]
            }

        case 'todos/todoLoaded':
            return {
                ...state,
                todos: [
                    ...state.todos,
                    ...action.payload
                ]
            }
        default:
            break;
    }
}

// create store
const store = createStore(
    todoReducer,
    applyMiddleware(
        fetchTodoMiddleware
    )
);

// subscribe to state changes
store.subscribe(() => {
    console.log(store.getState());
})

// dispatch actions

// store.dispatch({
//     type: 'todos/todoAdded',
//     payload: 'Learn Redux from LWS'
// })

store.dispatch({
    type: 'todos/fetchTodos'
})