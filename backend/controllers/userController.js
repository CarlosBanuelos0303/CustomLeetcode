const getUsers = (req, res) => {
    res.json({ message: "Lista de usuarios" });
};

const createUser = (req, res) => {
    const user = req.body;
    res.json({ message: "Usuario creado", user });
};

module.exports = {
    getUsers,
    createUser
};