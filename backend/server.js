const express = require("express");
const cors = require("cors");
const router = require("./routes"); // Use require instead of import

const app = express();

app.use(cors()); // Fix: should be used as a function
app.use(express.json());

app.use("/api/v1", router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
