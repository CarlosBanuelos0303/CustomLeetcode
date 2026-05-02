import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useState } from "react";
import Login from "./pages/Login"
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProblemDetail from "./pages/ProblemDetail";


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
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/problems/:id"
        element={
          <ProtectedRoute>
            <ProblemDetail />
          </ProtectedRoute>
        }
      />
    </Routes>
    </BrowserRouter>
  );
}


export default App;
