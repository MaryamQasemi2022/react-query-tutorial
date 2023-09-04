import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTodos, deleteTodo, updateTodo, addTodo } from "../../api/todosApi";

function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: todos,
    error,
    isError,
  } = useQuery("todos", getTodos, {
    select: (data) => data.sort((a, b) => b.id - a.id),
  });

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation.mutate({
      userId: 1,
      id: Date.now(),
      title: newTodo,
      completed: false,
    });
    setNewTodo("");
  };
  const handleDelete = (todo) => {
    deleteTodoMutation.mutate(todo);
  };
  const handleUpdate = (todo) => {
    updateTodoMutation.mutate({ ...todo, completed: !todo.completed });
  };

  if (isLoading) {
    return <p>loading..</p>;
  } else if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <main>
      <h1> todo list</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo"> enter a new Todo iten</label>
        <div>
          <input
            type="text"
            id="new-todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="enter a new todo"
          />
        </div>
        <button type="submit">submit</button>
      </form>
      {todos.map((todo) => (
        <article
          key={todo.id}
          style={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>
            <input
              type="checkbox"
              id={todo.id}
              checked={todo.completed}
              onChange={() => handleUpdate(todo)}
            />
            <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <button onClick={() => handleDelete(todo)}>delete</button>
        </article>
      ))}
    </main>
  );
}

export default TodoList;
