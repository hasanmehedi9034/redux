import { deleted } from "../actions";

const deleteTodo = (todoId) => {
    return async (dispatch, getState) => {
        await fetch(`http://localhost:9000/todos/${todoId}`, {
            method: 'DELETE',
        });

        dispatch(deleted(todoId));
    }
}

export default deleteTodo;
// const response =