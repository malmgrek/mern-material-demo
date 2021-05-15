const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const items = require("./routes/items");
const users = require("./routes/users");
const mongoUri = require("./configs").mongoUri;
const app = express();
const port = 3000;


mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(e => console.error("Connection error.", e.message));
mongoose
  .connection
  .on("error", console.error.bind(console, "MongoDB connection error:"));


app.use(express.urlencoded());
app.use(cors());
app.use(express.json());
app.use("/api/items", items);
app.use("/api/users", users);
app.get("/", (req, res) => res.send("Hello world!"));
app.listen(port, () => console.log(`Server running on port ${port}`));
