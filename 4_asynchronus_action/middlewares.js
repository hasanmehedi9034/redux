const fetch = require('node-fetch')


const delayAcctionMiddleware = (store) => (next) => (action) => {
    if(action.type === 'todos/todoAdded') {
        console.log('i am delaying your!');

        setTimeout(() => {
            next(action)
        }, 2000)

        return
    }
    return next(action)
}

const fetchTodoMiddleware = (store) => (next) => async (action) => {
    if(action.type === 'todos/fetchTodos') {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        const todos = await response.json();

        store.dispatch({
            type: 'todos/todoLoaded', 
            payload: todos
        })

        console.log(`Number of updated todos: ${store.getState()}`)

        return;
    }
    return next(action);
}


module.exports = {delayAcctionMiddleware, fetchTodoMiddleware}