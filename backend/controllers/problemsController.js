const pool = require("../db");

const getProblems = async (req, res) => {
    try {
        const result = await pool.query(
        "SELECT * FROM problems ORDER BY created_at DESC"
        );

        res.json(result.rows)
    } catch (err) {
        console.error(error);
        res.status(500).json({ message: "Error en servidor" });
    }


};

const getProblemById = async (req, res) => {

    const { id } = req.params;
    try {
        const result = await pool.query(
        "SELECT * FROM problems WHERE id = $1",
        [id]
        );

        res.json(result.rows[0])
    } catch (err) {
        console.error(error);
        res.status(500).json({ message: "Error en servidor" });
    }


};


module.exports = {
    getProblems,
    getProblemById 
};

