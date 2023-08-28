import axios from "axios";
const todosApi = axios.create({
  baseURL: "http://localhost:3500",
});
const getTodos = async () => {
  const response = await todosApi.get("/todos");
  return response.data;
};
const addTodo = async (newTodo) => {
  return await todosApi.post("/todos", newTodo);
};
const updateTodo = async (updateTodo) => {
  return await todosApi.put(`/todos/${updateTodo.id}`, updateTodo);
};
const deleteTodo = async (todo) => {
  return await todosApi.delete(`/todos/${todo.id}`);
};
export { getTodos, addTodo, updateTodo, deleteTodo };
export default todosApi;
