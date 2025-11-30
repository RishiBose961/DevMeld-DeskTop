import { Route, Routes } from "react-router";
import { Header } from "./components/header/Header";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CreatePost from "./pages/Create/CreatePost";
import Home from "./pages/home/Home";
import PlagCheck from "./pages/PostView/PlagCheck";
import PostView from "./pages/PostView/PostView";
import ReviewPage from "./pages/Review/ReviewPage";
import ReviewBlockPage from "./pages/BlockPage/ReviewBlockPage";

const App = () => {
  return (
    <>
      <Header />

      <div className="px-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/*" element={<div>404</div>} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/create" element={<CreatePost />} />
            <Route path="/review" element={<ReviewPage />} />Ō
            <Route path="/post/:id" element={<PostView/>} />
            <Route path="/reviewblockpage" element={<ReviewBlockPage/>} />
            <Route path="/plagcheck/:id" element={<PlagCheck/>} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
