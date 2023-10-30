const express = require("express");
const { connection } = require("./db");
const { userRouter} = require("./router/userRouter")
const {doctorRouter }= require("./router/doctorRoutes")

const app = express();
app.use(express.json())
app.use("/users", userRouter);
app.use("/doctors",doctorRouter)

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to masai hospital !" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error, try again later!" });
  }
});

app.listen(4545, async () => {
  try {
    await connection;
    console.log("Connected to DBS");
    console.log("Port is running at 4545");
  } catch (error) {
    console.log("Server Error");
  }
});
