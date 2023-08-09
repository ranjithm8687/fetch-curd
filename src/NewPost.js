import React, { useContext } from "react";
import DataContext from "./context/DataContext";

const NewPost = () => {
  const { postTitle, setPostTitle, postBody, setPostBody, handleSubmit } =
    useContext(DataContext);
  return (
    <main className="NewPost">
      <article>
        <form className="newPostForm" onSubmit={handleSubmit}>
          <label htmlFor="newPost">Post</label>
          <input
            type="text"
            id="newPost"
            required
            placeholder="New Post"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <label htmlFor="commPost">Post</label>
          <textarea
            name="commPost"
            id="commPost"
            required
            placeholder="Post Comment"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          ></textarea>
          <button className="newPostButton" type="submit">
            Submit
          </button>
        </form>
      </article>
    </main>
  );
};

export default NewPost;
