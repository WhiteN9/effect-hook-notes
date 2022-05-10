import React, { useState, useEffect } from "react";

function AlbumList({ user = {} }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function getUserAlbums() {
      // console.log(user.id);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`
      );
      const userAlbums = await response.json();
      console.log(userAlbums);
      setAlbums(userAlbums);
    }
    getUserAlbums();
  }, [user]);

  //if no user selected, display Please click on username
  //if user selected, display all the albums

  // console.log(albums);

  if (albums) {
    return (
      <div className="AlbumList">
        <h1>{user.name} Albums</h1>
        <ul>
          {albums.map((album) => (
            <p key={album.id}>{album.id} - {album.title}</p>
          ))}
        </ul>
      </div>
    );
  } else return <p>Please click on a user name to the left</p>;
}

export default AlbumList;
