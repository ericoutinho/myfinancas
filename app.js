const express = require("express");
const app = express();
const router = require("./routes/routes");
const cors = require("cors");

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors());
app.use(router);


app.listen(3000, (request, response) => {
    console.log("Server is UP on http://localhost:3000/");
})