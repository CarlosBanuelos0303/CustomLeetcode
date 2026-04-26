import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const HOST = "http://localhost:3000";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    try {
      const response = await fetch(`${HOST}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire(
          "Registro exitoso",
          "Tu cuenta ha sido creada",
          "success"
        ).then(() => navigate("/login"));
      } else {
        Swal.fire(
          "Error",
          result.message || "Error al registrar",
          "error"
        );
      }

    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        "No se pudo conectar con el servidor",
        "error"
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">Crear cuenta</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirmar contraseña</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Registrarse
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary w-100 mt-2"
              onClick={() => navigate("/login")}
            >
              ← Volver al login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;