import React, { useState, useEffect } from "react";

//A race condition is a situation when the code tries to execute 2 or more operations at the same time,
//producing undesirable results, like displaying wrong data, too many requests resulting slow execution to finish.
function ProfileEdit({ userID }) {
  const [user, setUser] = useState({});

  //in this case, as new userID was passed to the component, but the fetch() request is still running,
  //so there is a delay in displaying result.
  // console.log("render", user);
  useEffect(() => {
    setUser({});
    const abortController = new AbortController();
    // console.log(abortController);
    async function loadUser() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userID}`,
          //Init: An object containing any custom settings that you want to apply to the request.
          { signal: abortController.signal }
        );
        const userFromAPI = await response.json();
        setUser(userFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          //Ignore `AbortError`
          console.log("Aborted", userID);
        } else {
          throw error;
        }
      }
    }
    loadUser();

    //this cleanup only runs when the element is removed from the DOM
    return () => {
      console.log("cleanup", userID);
      abortController.abort(); // cancels any pending requests or response
    };
  }, [userID]); // Rerun this effect when new userID prop is passed in

  //set the document title to be user's name
  useEffect(() => {
    if (user.username) {
      document.title = `${user.username} : Edit Profile`;
    } else {
      document.title = "Edit Profile";
    }
  }, [user]); // Rerun this effect when the user changes

  const changeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  //why my savedData only give back an object of {id:#}
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

  if (user.id) {
    return (
      <form name="profileEdit" onSubmit={submitHandler}>
        <fieldset>
          <legend>API User ID: {user.id}</legend>
          <div>
            <label htmlFor="username">User Name:</label>
            <input
              id="username"
              name="username"
              type="text"
              required={true}
              value={user.username}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              required={true}
              value={user.email}
              onChange={changeHandler}
            />
          </div>
          <button type="submit">Save</button>
        </fieldset>
      </form>
    );
  }
  return "Loading...";
}

export default ProfileEdit;

//For the change handler to work, the name of the input must be exactly the same as the property on the user object.
