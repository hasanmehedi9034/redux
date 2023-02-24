// select DOM
const allMatches = document.querySelector('.all-matches');
const addMatchbutton = document.querySelector('.lws-addMatch');
const resetButton = document.querySelector('.lws-reset');

// utilities
const getRandomId = () => {
    const date = new Date();
    const time = date.getTime();
    return time;
}

const element = (id) => document.getElementById(id);

// action types
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const ADD_MATCH = 'addMatch';
const RESET_SCORE = 'resetScore';

// action creator
const increment = (payload) => {
    return {
        type: INCREMENT,
        payload
    }
}

const decrement = (payload) => {
    return {
        type: DECREMENT,
        payload
    }
}

const addMatch = () => {
    return {
        type: ADD_MATCH
    }
}

const resetScore = () => {
    return {
        type: RESET_SCORE
    }
}

// initial state
const initialState = [
    {
        id: getRandomId(),
        total: 120
    }
];

// match reducer
const matchReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_MATCH:
            return [
                ...state,
                {
                    id: getRandomId(),
                    total: 0
                }
            ]

        case INCREMENT:
            newState = state;
            newState[action.payload.i] = {
                id: getRandomId(),
                total: parseInt(newState[action.payload.i].total) + parseInt(action.payload.value)
            } 
            return newState

        case DECREMENT:
            newState = state;
            if (parseInt(newState[action.payload.i].total) - parseInt(action.payload.value) >= 0) {
                newState[action.payload.i] = {
                    id: getRandomId(),
                    total: parseInt(newState[action.payload.i].total) - parseInt(action.payload.value)
                }
            }
            else {
                newState[action.payload.i] = {
                    id: getRandomId(),
                    total: 0
                }
            }
            return newState

        case RESET_SCORE:
            newState = state.map(match => {
                return {
                    id: match.id,
                    total: 0
                }
            })
            return newState;
            
        default:
            return state;
    }
}

// create store
const store = Redux.createStore(matchReducer);

function match(id, s) {
    return (
        `
    <div class="match" id="match-${id}">
    <div class="wrapper">
        <button class="lws-delete" id="match-delete-${id}">
            <img src="./image/delete.svg" alt="" />
        </button>
        <h3 class="lws-matchName" id="match-amount-${id}">Match ${id + 1}</h3>
    </div>
    <div class="inc-dec">
        <form id="form-increment-${id}" class="incrementForm" action="">
            <h4>Increment</h4>
            <input
                id="increment-${id}"
                type="number"
                name="increment"
                class="lws-increment"
            />
        </form>
        <form id="form-decrement-${id}" class="decrementForm" action="">
            <h4>Decrement</h4>
            <input
                id="decrement-${id}"
                type="number"
                name="decrement"
                class="lws-decrement"
            />
        </form>
    </div>
    <div class="numbers">
        <h2 class="lws-singleResult" id="total-${id}">${s.total}</h2>
    </div>
    </div>
`
    )
}

// html render function
const render = () => {
    const state = store.getState();
    allMatches.innerHTML = '';

    state.forEach((s, i) => {
        allMatches.innerHTML += match(i, s)
    })

    state.forEach((s, i) => {
        element(`form-increment-${i}`).addEventListener('submit', (e) => {
            e.preventDefault(); 
        })

        element(`form-decrement-${i}`).addEventListener('submit', (e) => {
            e.preventDefault();
        })

        element(`decrement-${i}`).addEventListener('keyup', e => {
            if (e.key == 'Enter') {
                const value = e.target.value;
                store.dispatch(decrement({i, value}))
                e.target.value = ''
            }
        })

        element(`increment-${i}`).addEventListener('keyup', e => {
            if (e.key == 'Enter') {
                const value = e.target.value;
                store.dispatch(increment({i, value}))
                e.target.value = ''
            }
        })
    })
}
render();
store.subscribe(render);


addMatchbutton.addEventListener('click', (e) => {
    store.dispatch(addMatch())
})

resetButton.addEventListener('click', (e) => {
    store.dispatch(resetScore())
})


