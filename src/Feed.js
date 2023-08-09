import Post from "./Post";

const Feed = ({ searchResults }) => {
  return (
    <div>
      {searchResults.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
