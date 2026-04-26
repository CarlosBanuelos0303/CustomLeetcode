const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "secret_key";

const users = [];

const register = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: "Faltaron datos"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        email,
        password: hashedPassword
    };

    users.push(user);

    res.json({ message: "Usuario registrado"});

}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

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