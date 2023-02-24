export default function nextTodoId (todos) {
    return todos.reducer((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
}