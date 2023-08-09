import React, { useContext } from "react";
import DataContext from "./context/DataContext";
import Feed from "./Feed";

const Home = () => {
  const { searchResults, search, setSearch, fetchError, isLoading } =
    useContext(DataContext);
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Is Loading...</p>}
      {!isLoading && fetchError && (
        <p
          className="statusMsg"
          style={{ color: "red" }}
        >{`Error:${fetchError}`}</p>
      )}

      {!isLoading && !fetchError && (
        <>
          <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">Post</label>
            <input
              type="text"
              placeholder="Search Post"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {searchResults.length ? (
            <Feed searchResults={searchResults} />
          ) : (
            <p className="statusMsg">
              Post not found Please Create The Post From Post Page are Reload
              The App
            </p>
          )}
        </>
      )}
    </main>
  );
};

export default Home;
