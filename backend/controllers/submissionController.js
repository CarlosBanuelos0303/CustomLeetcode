const pool = require("../db");

const getSubmissions = async (req, res) => {
  const { id } = req.params;

  if (!id) {
  return res.status(400).json({ message: "Problem id required" });
}

  try {
    const email = req.user.email;

    const result = await pool.query(
    "SELECT * FROM submissions WHERE problem_id = $1 AND user_email = $2 ORDER BY created_at DESC",
    [id, email]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const setSubmission = async (req, res) => {
  const { problem_id, code } = req.body;

  const email = req.user.email;
  const status = "pending";

  if (!problem_id || !code || code.trim() === "") {
    return res.status(400).json({ message: "Invalid submission" });
  }

  try {
    const problem = await pool.query(
      "SELECT id FROM problems WHERE id = $1",
      [problem_id]
    );

    if (problem.rows.length === 0) {
      return res.status(404).json({ message: "Problem not found" });
    }

    await pool.query(
      "INSERT INTO submissions (user_email, problem_id, code, status) VALUES ($1, $2, $3, $4)",
      [email, problem_id, code, status]
    );

    res.json({ message: "Submission registered" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getSubmissions,
  setSubmission
};