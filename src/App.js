import React, { useState, useEffect } from "react";
import "./App.css";
import ProfileEdit from "./ProfileEdit";
import ToDos from "./ToDos";
import ClickCounter from "./ClickCounter";

function App() {
  const [userId, setUserID] = useState(1);

  const userIds = [1, 2, 3, 4];
  // console.log(userId)
  return (
    <div className="App">
      {/* <ClickCounter /> */}
      {userIds.map((id) => (
        <button key={id} onClick={() => setUserID(id)}>
          User ID {id}
        </button>
      ))}
      <h2>User ID {userId}</h2>
      {/* <ProfileEdit userID={userId}/> */}
      <ToDos />
    </div>
  );
}

export default App;
