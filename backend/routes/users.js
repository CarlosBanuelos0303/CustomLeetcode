const express = require("express");
const router = express.Router();

const { getUsers, createUser } = require("../controllers/userController");
console.log(getUsers)
console.log(2);

router.get("/", getUsers);

router.post("/", createUser);

module.exports = router;

