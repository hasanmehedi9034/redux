// select dom elements
const counterEl = document.getElementById('counter');
const increaseEl = document.getElementById('increase');
const decreaseEl = document.getElementById('decrease');

// initial  state
const initialState = {
    value: 0
}

// create reducer function
const counterReducer = (state = initialState, action) => {
    if(action.type === 'increase') {
        return {
            ...state,
            value: state.value + 1
        }
    }
    else if(action.type === 'decrease') {
        return {
            ...state,
            value: state.value - 1
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

store.subscribe(render)

// button click listener
increaseEl.addEventListener('click', () => {
    store.dispatch({
        type: 'increase',
    })
})

decreaseEl.addEventListener('click', () => {
    store.dispatch({
        type: 'decrease',
    })
}) 