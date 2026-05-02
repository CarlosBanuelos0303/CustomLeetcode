import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HOST = "http://localhost:3000";

const ProblemDetail = () => {
  const { id } = useParams(); 

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`${HOST}/problems/${id}`);
        const data = await response.json();
        setProblem(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el problema:", error);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  console.log("a");
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          Problema no encontrado
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="card p-4 mb-3">
        <h2>{problem.title}</h2>

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
      </div>

      {/* Descripción */}
      <div className="card p-4 mb-3">
        <p>{problem.description}</p>
      </div>

      {/* Editor (placeholder) */}
      <div className="card p-4">
        <h5>Tu solución</h5>

        <textarea
          className="form-control"
          rows="10"
          placeholder="Escribe tu código aquí..."
        />
      </div>

    </div>
  );
};

export default ProblemDetail;