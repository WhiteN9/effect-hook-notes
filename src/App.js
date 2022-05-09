import React, { useState, useEffect } from "react";
import "./App.css";
import ProfileEdit from "./ProfileEdit";
import ToDos from "./ToDos";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
      <ProfileEdit />
      <ToDos />
    </>
  );
}

export default App;
