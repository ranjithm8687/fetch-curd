import { createContext, useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import requestApi from "../requestApi";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const API_URL = "http://localhost:3500/posts";
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { width } = useWindowSize("");
  const navigate = useNavigate("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data Not Received");
        const listPosts = await response.json();
        setPosts(listPosts);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    (() =>
      setTimeout(() => {
        fetchData();
      }, 2000))();
  }, []);

  useEffect(() => {
    const finalResult = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(finalResult.reverse());
  }, [posts, search]);

  const handleSubmit = async () => {
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const title = postTitle;
    const datetime = format(new Date(), "MMMM dd, yyyy,pp");
    const body = postBody;
    const newPostLayout = { id, title, datetime, body };
    const createPost = [...posts, newPostLayout];
    setPosts(createPost);
    setPostTitle("");
    setPostBody("");
    navigate("/");
    const newPostOptions = {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(newPostLayout),
    };
    const result = await requestApi(API_URL, newPostOptions);
    if (result) setFetchError(result);
  };

  const handleEdit = async (id) => {
    const title = editTitle;
    const datetime = format(new Date(), "MMMM dd, yyyy,pp");
    const body = editBody;
    const editLayOut = { id, title, datetime, body };
    const editPostLayout = posts.map((post) =>
      post.id === id ? { ...editLayOut } : post
    );
    setPosts(editPostLayout);
    setEditTitle("");
    setEditBody("");
    navigate("/");
    const upDateOptions = {
      method: "PUT",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(editLayOut),
    };
    const reqURL = `${API_URL}/${id}`;
    const result = await requestApi(reqURL, upDateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const deletePost = posts.filter((post) => post.id !== id);
    setPosts(deletePost);
    navigate("/");
    const deletePostOptions = {
      method: "DELETE",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(deletePost),
    };
    const reqURL = `${API_URL}/${id}`;
    const result = await requestApi(reqURL, deletePostOptions);
    if (result) setFetchError(result);
  };

  return (
    <DataContext.Provider
      value={{
        width,
        posts,
        searchResults,
        search,
        setSearch,
        fetchError,
        isLoading,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        handleSubmit,
        editTitle,
        setEditTitle,
        editBody,
        setEditBody,
        handleEdit,
        handleDelete,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
