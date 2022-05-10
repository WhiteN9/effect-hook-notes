function AlbumList({ user = {} , albums }) {

  //if no user selected, display Please click on username
  //if user selected, display all the albums

  // console.log(albums);
  if (albums.length > 0) {
    return (
      <div className="AlbumList">
        <h1>{user.name} Albums</h1>
        <ul>
          {albums.map((album) => (
            <p key={album.id}>
              {album.id} - {album.title}
            </p>
          ))}
        </ul>
      </div>
    );
  } else 
  return <p>Please click on a user name to the left</p>;
}

export default AlbumList;
