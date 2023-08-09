import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Home from "./Home";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import NewPost from "./NewPost";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="post">
            <Route index element={<NewPost />} />
            <Route path=":id" element={<PostPage />} />
          </Route>
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="missing" element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
