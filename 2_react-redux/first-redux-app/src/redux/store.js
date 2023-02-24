import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import rootReducer from './rootReducer';

// create our first middleware
const myLogger = (store) => (next) => (action) => {
    console.log(`Action: ${JSON.stringify(action)}`);
    console.log(`Before: ${JSON.stringify(store.getState())}`);

    const upcommingState = [action].reduce(rootReducer, store.getState);

    console.log(`upcoming state: ${JSON.stringify(upcommingState)}`);

    // pass action
    return next(action);
}

const store = createStore(
    rootReducer,
    applyMiddleware(myLogger)
);

export default store;



