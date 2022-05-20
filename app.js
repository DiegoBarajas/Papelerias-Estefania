const express = require ("express");
const app = express();
const server = 8080;

app.listen(server, ()=>{
    console.log("Server launched");
});