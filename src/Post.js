import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <main className="post">
      <article>
        <Link to={`post/${post.id}`}>
          <h2>{post.title}</h2>
          <p className="postDate">{post.datetime}</p>
        </Link>
        <p className="postBody">{post.body}</p>
      </article>
    </main>
  );
};

export default Post;
