const express = require("express");
const ejs = require("ejs");
const linkRoute = require("./src/routes/linkRoute");
const linkController = require("./src/controllers/linkController");

const app = express();

app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public")); // for serving static files
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

app.get("/home", (req, res) => {
    res.render(__dirname + "/views/home");
});

app.get("/register", (req, res) => {
    res.send("Register page");
});

app.use((req, res, next) => {
    if (req.path === "/") {
        return res.redirect("/home");
    }

    next();
});

app.get("/*", linkController.redirectUrl);
app.use("/api/v1", linkRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
