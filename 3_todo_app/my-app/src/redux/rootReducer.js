import { combineReducers } from "redux";
import todosReducer from "./todos/reducer";
import filterReducer from "./filters/reducer";

const rootReducer = combineReducers({
    filters: filterReducer,
    todos: todosReducer
})

export default rootReducer;