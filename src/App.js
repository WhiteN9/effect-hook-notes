import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count+1)}>Click me</button>
      </div>
      <ProfileEdit />
    </>
  );
}

export default App;