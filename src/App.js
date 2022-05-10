import React, { useState, useEffect } from "react";
import "./App.css";

import ClickCounter from "./ClickCounter";

import ProfileEdit from "./ProfileEdit";
import ToDos from "./ToDos";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  // Load data from https://jsonplaceholder.typicode.com/albums?userId=${user.id}
  const controller = new AbortController();
  useEffect(() => {
    setUsers([]);
    async function getUsers() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users`,
          { signal: controller.signal }
        );
        const usersIDList = await response.json();
        setUsers(usersIDList);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    getUsers();

    return () => {
      // console.log("clean",);
      controller.abort();
    };
  }, []);


  // console.log(users); // [{id:1,name:'Leanna',...},{...}]
  console.log(currentUser);


    return (
      <div className="App">
        <div className="left column">
          <UserList users={users} setCurrentUser={setCurrentUser} />
        </div>
        <div className="right column">
          <AlbumList user={currentUser} />
        </div>
      </div>
    );
  
}

export default App;

  // useEffect(() => {
  //   async function getCurrentUser() {
  //     const response = await fetch(
  //       `https://jsonplaceholder.typicode.com/albums?userId=1`
  //     );
  //     const users = await response.json();
  //     setCurrentUser(users);
  //   }
  //   getCurrentUser();
  // }, []);
