const express = require ("express");
const app = express();
const server = 8080;

app.set("view engine", "pug");

app.get("/",(req, res)=>{
    res.render("index");
});

app.listen(server, ()=>{
    console.log("Server launched");
});