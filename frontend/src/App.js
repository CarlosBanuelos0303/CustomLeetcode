import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useState } from "react";
import Login from "./pages/Login"
import Home from "./pages/Home";
import Register from "./pages/Register";

import logo from './logo.svg';
import './App.css';

const ProtectedRoute = ({children}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to= "/login" />;
  }
  return children;
}



function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login setToken={setToken} />}
        />

        <Route
          path="/"
          element={
            token ? <Home /> : <Navigate to="/login" />
          }
        />

        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
