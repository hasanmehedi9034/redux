// select dom elements
const counterEl = document.getElementById('counter');
const increaseEl = document.getElementById('increase');
const decreaseEl = document.getElementById('decrease');

// action identifiers
const  INCREMENT = 'increase';
const  DECREMENT = 'decrease';

// action creators
const increment = (value) => {
    return {
        type: INCREMENT,
        payload: value
    }
}
const decrement = (value) => {
    return {
        type: DECREMENT,
        payload: value
    }
}

// initial  state
const initialState = {
    value: 0
}

// create reducer function
const counterReducer = (state = initialState, action) => {
    if(action.type === INCREMENT) {
        return {
            ...state,
            value: state.value + action.payload
        }
    }
    else if(action.type === DECREMENT) {
        return {
            ...state,
            value: state.value - action.payload
        }
    }
    else {
        return state
    }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState();
    counterEl.innerText = state.value;
}

// update UI initially
render();


store.subscribe(render);

// button click listener
increaseEl.addEventListener('click', () => {
    store.dispatch(increment(2));
})

decreaseEl.addEventListener('click', () => {
    store.dispatch(decrement(1));
}) 