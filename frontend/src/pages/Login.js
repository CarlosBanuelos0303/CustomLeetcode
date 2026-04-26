import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HOST = "http://localhost:3000"

const Login = ({setToken}) => {
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(`${HOST}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem("token",data.token)
      setToken(data.token);
     navigate("/");
    } else {
      alert(data.message || "Correo o contraseña incorrecta");
    }
  } catch (error) {
    alert("Error de conexión con el servidor");
    console.error(error);
  }
};

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">Inicia Sesión</h4>

          <form onSubmit={handleLogin}>
            <div className="input-group mb-3 shadow">
              <span className="input-group-text"><i className="bi bi-envelope"></i></span>
              <div className="form-floating">
                <input 
                  type="text" 
                  className="form-control" 
                  id="floatingInputGroup1" 
                  placeholder="Correo" 
                  name="email" 
                  required 
                />
                <label htmlFor="floatingInputGroup1">Correo</label>
              </div>
            </div>

            <div className="input-group mb-3 shadow">
              <span className="input-group-text"><i className="bi bi-shield-lock"></i></span>
              <div className="form-floating">
                <input 
                  type="password" 
                  className="form-control" 
                  id="floatingInputGroup2" 
                  placeholder="Contraseña" 
                  name="password" 
                  required 
                />
                <label htmlFor="floatingInputGroup2">Contraseña</label>
              </div>
            </div>

            <button className="btn btn-success w-100 mb-2">
              <i className="bi bi-person-fill-check"></i> Entrar
            </button>

            <button 
              type="button"
              className="btn btn-outline-primary w-100 mb-3"
              onClick={() => navigate("/Register")}
            >
              <i className="bi bi-person-plus-fill"></i> Regístrate
            </button>

            <div className="text-center">
              <a href="/recuperar" className="text-info text-decoration-none">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
