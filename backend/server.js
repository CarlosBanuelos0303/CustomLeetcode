const express = require("express")
const cors = require("cors");

const app = express();

const PORT = 3000;

const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");

app.use(cors());
app.use(express.json())
app.use("/users",usersRoute);
app.use("/auth",authRoute)

app.get("/api", (req, res) => {
    console.log(req.query)
    //res.send("API Funcionando");
    res.json(people);
})

app.listen(PORT, () => {
    console.log("Server running");
})