const array = [1, 2, 3, 4, 5, 5];

const total = array.reduce((result, current) => {
    return result + current;
}, 0);


const initialState = {
    value: 0
}

const acitons = [
    {type: 'increment', payload: 1},
    {type: 'increment', payload: 1},
    {type: 'increment', payload: 1},
    {type: 'decrement', payload: 1},
];

const counterReducer = (state, action) => {
    if(action.type === 'increment') {
        return {
            ...state,
            value: state.value + action.payload
        }
    }
    else if(action.type === 'decrement') {
        return {
            ...state,
            value: state.value - action.payload
        }
    }
    else {
        return state;
    }
}

const filanResult = acitons.reduce(counterReducer, initialState);
console.log(filanResult);

// const getMax = (a, b) => Math.max(a, b);

// const result = [1, 5, 7, 10, 0, 22, 37].reduce(getMax);

// console.log(result);