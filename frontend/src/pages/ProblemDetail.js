import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HOST = "http://localhost:3000";

const ProblemDetail = () => {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);

  const [code, setCode] = useState("");

  // 🔥 Fetch problema
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${HOST}/problems/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

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

  // 🔥 Fetch submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${HOST}/submissions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        setSubmissions(data);
        setLoadingSubmissions(false);
      } catch (err) {
        console.error(err);
        setLoadingSubmissions(false);
      }
    };

    fetchSubmissions();
  }, [id]);

  // 🔥 Enviar submission
  const handleSubmit = async () => {
    if (!code.trim()) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(`${HOST}/submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          problem_id: id,
          code
        })
      });

      // 🔥 refrescar submissions
      setLoadingSubmissions(true);

      const response = await fetch(`${HOST}/submissions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      setSubmissions(data);
      setLoadingSubmissions(false);

      setCode(""); 

    } catch (err) {
      console.error(err);
    }
  };

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

      {/* Editor */}
      <div className="card p-4 mb-3">
        <h5>Tu solución</h5>

        <textarea
          className="form-control"
          rows="10"
          placeholder="Escribe tu código aquí..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          className="btn btn-success mt-3"
          onClick={handleSubmit}
        >
          Enviar solución
        </button>
      </div>

      <div className="card p-4">
        <h3>Tus envíos</h3>

        {loadingSubmissions ? (
          <p>Cargando...</p>
        ) : submissions.length === 0 ? (
          <p>No hay submissions aún</p>
        ) : (
          <ul className="list-group">
            {submissions.map((sub) => (
              <li key={sub.id} className="list-group-item">
                <strong>{sub.status}</strong> —{" "}
                {new Date(sub.created_at).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default ProblemDetail;