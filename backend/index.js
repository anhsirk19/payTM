const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index.js");

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.json("hi there");
})

app.use("/api/v1/", mainRouter);

app.listen(process.env.PORT, () => {
    console.log(`SERVER LISTENING ON ` + process.env.PORT);
})
