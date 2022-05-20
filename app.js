const express = require ("express");
const app = express();
const port = 8080;

app.set("view engine", "pug");

//--- Index ----------------------------------------------------------------------------
app.get("/",(req, res)=>{
    res.render("index");
});

//--- Empleados ------------------------------------------------------------------------
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
//Menu Cliente
app.get("/cliente/menu",(req, res)=>{
    res.render("");
});

//Productos de escritura
app.get("/cliente/poductos/escritura",(req, res)=>{
    res.render("");
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


//Lanzar servidor
app.listen(port, ()=>{
    console.log("Server launched in the port "+port);
});