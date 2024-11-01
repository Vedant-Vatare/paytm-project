const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;
const {User} = require("./db");

const rootRouter = require("./routes/index");
app.use("/api/v1", rootRouter);

app.listen(PORT);
