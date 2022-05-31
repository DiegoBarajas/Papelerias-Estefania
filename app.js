const express = require ("express");
const app = express();
const port = 8080;

app.use("/public",express.static("public"));

app.set("view engine", "pug");

//--- Index ----------------------------------------------------------------------------
app.get("/",(req, res)=>{
    res.render("index");
});

//--- Empleados ------------------------------------------------------------------------
//Crear cuenta
app.get("/crear-e", (req, res)=> {
    res.render("create-acc-e");
});

//Menu Empleado
app.get("/empleado/menu",(req, res)=>{
    res.render("");
});

//Contacto con proveedores
app.get("/empleado/proovedores",(req, res)=>{
    res.render("");
});

//Productos especiales en stock
app.get("/empleado/especiales",(req, res)=>{
    res.render("");
});

//Pedidos recientes
app.get("/empleado/pedidos",(req, res)=>{
    res.render("");
});

//Inventario
app.get("/empleado/inventario",(req, res)=>{
    res.render("");
});

//--- Clientes ------------------------------------------------------------------------
//Crear cuenta
app.get("/crear-c",(req, res)=>{
    res.render("create-acc-c");
});

//Productos de escritura
app.get("/cliente/poductos/escritura",(req, res)=>{
    res.render("lapices");
});

//Productos de papel
app.get("/cliente/poductos/papeleria",(req, res)=>{
    res.render("");
});

//Productos de medicion
app.get("/cliente/poductos/medicion",(req, res)=>{
    res.render("");
});

//Productos de manualidades
app.get("/cliente/poductos/manualidades",(req, res)=>{
    res.render("");
});

//Canasta
app.get("/cliente/canasta",(req, res)=>{
    res.render("");
});

app.get("/login",(req, res)=>{
    res.render("login");
});

app.get("/empleado/login", (req, res)=>{
    res.render("login-employee");
});

app.get("/cliente/login", (req, res)=>{
    res.render("login-client");
});

app.get("/index-empleado/login", (req, res)=> {
    res.render("index-employee");
});

app.get("/inventario", (req, res)=> {
    res.render("stock");
});

app.get("/agregar", (req, res)=> {
    res.render("new-product")
})

//Lanzar servidor
app.listen(port, ()=>{
    console.log("Server launched in the port "+port);
});