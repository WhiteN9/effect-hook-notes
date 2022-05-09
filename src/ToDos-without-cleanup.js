import React, { useEffect, useState } from "react";

function ToDos() {
  const [toDos, setToDos] = useState([]);

  // Load data from https://jsonplaceholder.typicode.com/todos?userId=2

  //question about this:
  //on line 13, why both `setToDos` and `data => setToDos(data)` work
  //   useEffect(() => {
  //     fetch("https://jsonplaceholder.typicode.com/todos?userId=2")
  //       .then((response) => response.json())
  //       .then((data) => setToDos(data));
  //   }, []); // Passing [] so that it only runs the effect once;

  //so is response and userFromAPI just a promise waiting to be fulfilled?
  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?userId=2"
      );
    //   console.log(
    //     "making a request",
    //     fetch("https://jsonplaceholder.typicode.com/todos?userId=2")
    //   ); //fetch is a method that starts the process of fetching, return a promise which is fulfilled once the response is available
    //   console.log("promise", response);
      const userFromAPI = await response.json(); //taking JSON as input and parsing it to produce a JavaScript object.
    //   console.log("promise", response.json());
    //   console.log("userFromAPI", userFromAPI);

      setToDos(userFromAPI);
    }
    fetchUser();
  }, []);

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

// Warning: An update to %s inside a test was not wrapped in act(...).
// When testing, code that causes React state updates should be wrapped into act(...):
// act(() => {
//   /* fire events that update state */
// });
// /* assert on the output */
// This ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act%sApp
//     in App
