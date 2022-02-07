import React, { useEffect, createContext, useReducer, useContext } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Profile from "./screens/Profile";
import UserProfile from "./screens/UserProfile";
import CreatePost from "./screens/CreatePost";
import SubscribesUserPost from "./screens/SubscribesUserPost";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();
const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      navigate("/signin");
    }
  }, []);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/profile/:userid" element={<UserProfile />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/myfollowingpost" element={<SubscribesUserPost />} />
      </Routes>
    </>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
