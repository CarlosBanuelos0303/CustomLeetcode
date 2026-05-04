const express = require("express")
const cors = require("cors");

const app = express();

const PORT = 3000;

const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const problemsRoute = require("./routes/problems");
const submissionsRoute = require("./routes/submissions");

app.use(cors());
app.use(express.json())
app.use("/users",usersRoute);
app.use("/auth",authRoute)
app.use("/problems",problemsRoute)
app.use("/submissions",submissionsRoute)


app.listen(PORT, () => {
    console.log("Server running");
})