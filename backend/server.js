const express = require("express")
const cors = require("cors");

const app = express();

const PORT = 3000;

const usersRoute = require("./routes/users");

app.use("/users",usersRoute);

const people = [
  {
    name: "Lena",
    job: "Architect",
    isRich: true
  },
  {
    name: "Marcus",
    job: "Barista",
    isRich: false
  },
  {
    name: "Ava",
    job: "Software Engineer",
    isRich: true
  }
]

app.use(cors());
app.use(express.json())

app.get("/api", (req, res) => {
    console.log(req.query)
    //res.send("API Funcionando");
    res.json(people);
})

app.listen(PORT, () => {
    console.log("Server running");
})