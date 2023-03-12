const fetch = require('node-fetch');
const {legacy_createStore , applyMiddleware} = require('redux');
const thunk = require('redux-thunk')

// iniitial state
const initialState = {
    loading: false,
    posts: [],
    error: ''
}

const fetchPostRequested = () => {
    return {
        type: 'posts/request',
    }
}

const fetchPostSucceeded = (posts) => {
    return {
        type: 'posts/succeeded',
        payload: posts
    }
}

const postFailded = (error) => {
    return {
        type: 'posts/failed',
        payload: error
    }
}

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'posts/request':
            return {
                ...state,
                loading: true,
                error: ''
            }

        case 'posts/succeeded':
            return {
                ...state,
                loading: false,
                error: '',
                posts: action.payload
            }

        case 'posts/failed':
            return {
                ...state,
                error: action.payload.message,
                posts: []
            }

        default:
            return state
    }
}

//thunk function
const fetchPosts = () => {
    return async (dispatch) => {
        dispatch(fetchPostRequested())
        try {
            const response = await fetch('https://jsonplaceholder.typicode.co/posts?_limit=5')
            const posts = await response.json();
            dispatch(fetchPostSucceeded(posts));
        }
        catch (err) {
            dispatch(postFailded(err));
        }
    }
}

// create store
const store = legacy_createStore(reducer, applyMiddleware(
    thunk.default
))

// subscribe to state changes
store.subscribe(() => {
    console.log(store.getState());
})

// dispatch action
store.dispatch(fetchPosts())

