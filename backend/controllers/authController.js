const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const JWT_SECRET = "secret_key";


const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Faltaron datos" });
  }

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    res.json({ message: "Usuario registrado" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en servidor" });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
    );

    const user = result.rows[0];

    if (!user) {
        return res.status(400).json({ message: "Usuario no existe" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return res.status(400).json({ message: "Password incorrecto" });
    }

    const token = jwt.sign(
        { email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        message: "Login exitoso",
        token
    });

};;


module.exports = {
    register,
    login
};