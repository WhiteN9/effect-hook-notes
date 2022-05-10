import React, { useState, useEffect } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

//Potential error occured from the tests:
//Must have an if in the album if we are testing with undefined;

function App() {
  const originalDocName = document.title;
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  // Load data from https://jsonplaceholder.typicode.com/albums?userId=${user.id}
  const controller = new AbortController();

  //this first useEffect hook, the abort might not matter too much because users are always loaded
  
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
          console.log("Aborted no users were fetched");
        } else {
          console.log("Bad link, 404 now");
        }
      }
    }
    getUsers();

    //clean up function can do more than just abort;
    return () => {
      controller.abort();
      document.title = originalDocName; //this line can be in any cleanup function that is in useEffect hook
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

  //why it doesn't work here in the test
  useEffect(() => {
    // console.log(currentUser.id)
    // if (users.length > 0) {
      console.log("mounted");
      document.title = "Awesome Album App";
    // }
    // else {
    //   console.log("unmounted");
    //   document.title = originalDocName;
    // }
  }, [users]); // <<< what kind of parameter is good here

  // console.log(users); // [{id:1,name:'Leanna',...},{...}]
  // console.log(currentUser);
  // console.log(albums);
  return (
    <div className="App">
      <div className="left column">
        {users && <UserList users={users} setCurrentUser={setCurrentUser} />}
      </div>
      <div className="right column">
        {albums && <AlbumList user={currentUser} albums={albums} />}
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
