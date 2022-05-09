import React, { useEffect, useState } from "react";

function ToDos() {
  const [toDos, setToDos] = useState([]);

  // Load data from https://jsonplaceholder.typicode.com/todos?userId=2

  //question about this:
  //on line 13, why both `setToDos` and `data => setToDos(data)` work
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?userId=2")
    .then((response) => response.json())
    .then(data => setToDos(data));
  },[]); // Passing [] so that it only runs the effect once;
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

export default ToDos;
