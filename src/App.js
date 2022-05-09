import React, { useState, useEffect } from "react";
import "./App.css";

import ClickCounter from "./ClickCounter";

import ProfileEdit from "./ProfileEdit";
import ToDos from "./ToDos";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  // const [userId, setUserID] = useState(1);
  // const userIds = [1, 2, 3, 4];
  // console.log(userId)

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  // Load data from https://jsonplaceholder.typicode.com/albums?userId=${user.id}

  return (
    <div className="App">
      {/* <ClickCounter /> */}
      {/* {userIds.map((id) => (
        <button key={id} onClick={() => setUserID(id)}>
          User ID {id}
        </button>
      ))} */}
      {/* <h2>User ID {userId}</h2> */}
      {/* <ProfileEdit userID={userId}/> */}
      {/* <ToDos /> */}
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
