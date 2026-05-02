import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const HOST = "http://localhost:3000";

const token = localStorage.getItem("token");

const Home = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(`${HOST}/problems`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
        const data = await response.json();

        setProblems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener problemas:", error);
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="title1 mb-4 text-center">
        Lista de Problemas
      </h2>

      <div className="card shadow-lg p-4">

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : problems.length === 0 ? (
          <div className="alert alert-info text-center">
            No hay problemas disponibles
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="fondo-pantone-amarillo">
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Dificultad</th>
                  <th>Fecha</th>
                </tr>
              </thead>

              <tbody>
                {problems.map((problem, index) => (
                  <tr key={problem.id} onClick={() => navigate(`/problems/${problem.id}`)}
                  style={{ cursor: "pointer" }}>
                    <td>{problem.id}</td>

                    <td>
                      <strong>{problem.title}</strong>
                    </td>

                    <td>
                      <span
                        className={
                          problem.difficulty === "easy"
                            ? "badge bg-success"
                            : problem.difficulty === "medium"
                            ? "badge bg-warning text-dark"
                            : "badge bg-danger"
                        }
                      >
                        {problem.difficulty}
                      </span>
                    </td>

                    <td>
                      <small>
                        {new Date(problem.created_at).toLocaleDateString()}
                      </small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;