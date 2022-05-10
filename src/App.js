import React, { useState, useEffect } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const originalDocName = document.title;
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
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
          console.log("Aborted????");
        } else {
          throw error;
        }
      }
    }
    getUsers();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setAlbums([]);
    async function getUserAlbums() {
      // console.log(currentUser);
      // console.log(currentUser.id)
      // console.log(
      //   `https://jsonplaceholder.typicode.com/albums?userId=${currentUser.id}`)
      try {
        if (currentUser.id) {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/albums?userId=${currentUser.id}`,
            { signal: controller.signal }
          );
          const userAlbums = await response.json();
          setAlbums(userAlbums);
        }

        // console.log(userAlbums);
        // setAlbums(userAlbums);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", currentUser.id);
        } else {
          throw error;
        }
      }
    }
    getUserAlbums();

    return () => {
      controller.abort();
    };
  }, [currentUser]);

  useEffect(() => {
    // console.log(currentUser.id)
    if (currentUser.id) {
      document.title = "Awesome Album App";
    } else {
      console.log("a");
      document.title = originalDocName;
    }
  }, [currentUser]);

  // console.log(users); // [{id:1,name:'Leanna',...},{...}]
  // console.log(currentUser);
  // console.log(albums);
  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} />
      </div>
      <div className="right column">
        <AlbumList user={currentUser} albums={albums} />
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
