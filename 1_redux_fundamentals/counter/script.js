// select DOM element
const counterEl = document.getElementById('counter');
const incrementEl = document.getElementById('increment');
const decrementEl = document.getElementById('decrement');

// action identifier
const INCREMENT = 'increment';
const DECREMENT = 'decrement';

// action creator
const incrementCreator = (n) => {
    return {
        type: INCREMENT,
        payload: n
    }
}

const decrementCreator = (n) => {
    return {
        type: DECREMENT,
        payload: n
    }
}

// initial state
const initialState = {
    value: 0
}

// reducer
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
        return state;
    }
}

// create store
const store = Redux.createStore(counterReducer);

const render = (e) => {
    const state = store.getState();
    e.innerText = state.value;
}

render();

// subscribe
store.subscribe(render);

// Button Event 
// incrementEl.addEventListener('click', () => {
//     store.dispatch(incrementCreator(2));
// });

// decrementEl.addEventListener('click', () => {
//     store.dispatch(decrementCreator(2))
// });

const counters = document.getElementById('counters');
const addButton = document.getElementById('add-counter');

addButton.addEventListener('click', () => {
    const newCounter = `
        <div class="singleCounter">
            <p id="counter">${render(this)}</p>
            <button onclick="addOne(1)">increment</button>
            <button onclick="subOne(1)">decrement</button>
        </div>
    `
    counters.innerHTML += newCounter;
})

function addOne(n) {
    store.dispatch(incrementCreator(n));
}

function subOne(n) {
    store.dispatch(decrementCreator(n));
}

