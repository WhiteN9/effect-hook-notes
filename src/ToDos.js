import React, { useEffect, useState } from "react";

function ToDos() {
  const [toDos, setToDos] = useState([]);

  
  useEffect(() => {
    setToDos([]);
    const controller = new AbortController();
    async function getUserTodos() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos?userId=3`,
          { signal: controller.signal }
        );
        const userToDosFromAPI = await response.json();
        setToDos(userToDosFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
            console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    getUserTodos();
    // console.log(toDos);
    return () => {
      controller.abort();
    };
  }, []);
  
  if (toDos) {
    return (
      <div className="App">
        <h1>To Do List</h1>
        <ul className="todo-list">
          {toDos.map((todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "",
              }}
            >
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return "Loading...";
}

export default ToDos;
