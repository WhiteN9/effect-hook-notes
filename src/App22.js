import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({});

  const changeHandler = (event) => {
    // console.log("target", event.target)
    // console.log("id", event.target.id)
    // console.log("type", event.target.type)
    // console.log("value", event.target.value)
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  console.log("render", user);
  useEffect(() => {
    console.log("useEffect hook in action");
    async function loadUsers() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/2"
      );
      const userFromAPI = await response.json();
      console.log("setUser then render", userFromAPI);
      setUser(userFromAPI);
    }
    loadUsers();
  }, []);
  /*
  //more concise syntax using the Promise interface, but they say it is old, 
  //because it doesn't read like synchronous code:
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then(setUser);
  }, []); //not setUser(response) ? 
  */

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${user.id}`,
      {
        method: "PUT",
        body: JSON.stringify(user),
      }
    );
    const savedData = await response.json();
    console.log("Saved user!", savedData);
  };
  // console.log("user", user)
  // console.log(user.id)
  // console.log("key username", user.username)
  // console.log("key wrongusername", user.wrongusername)
  // console.log(user.email2)

  if (user.id) {
    return (
      <form name="profileEdit" onSubmit={submitHandler}>
        <label htmlFor="username2">
          User Name:
          <input
            id="username2"
            name="wrongusername"
            type="text"
            value={user.username}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="email2">
          User Name:
          <input
            id="email2"
            name="wrongemail"
            type="email"
            value={user.email}
            onChange={changeHandler}
          />
        </label>
      </form>
    );
  }
  // console.log("Loadddddddddddddddddddddding");
  return "Loadddddddddddddddddddddding";
}

export default App;
