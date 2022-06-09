const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 3001;

app.use(express.json());
app.use(cors());

const uploadRoute = require("./routes/upload");
app.use("/upload", uploadRoute);


app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}...`);
});

