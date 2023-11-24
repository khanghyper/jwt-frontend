import { Routes, Route } from "react-router-dom";
import Nav from "./components/Navigation/Nav";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<h1>Home page</h1>}></Route>
        <Route path="*" element={<h1>404 not found</h1>}></Route>
      </Routes>
    </>
  );
}

export default App;
