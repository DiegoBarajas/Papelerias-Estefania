const express = require ("express");
const mysql = require ("mysql");
const app = express();
const port = 8080;
const conexion = mysql.createConnection({
    host: "localhost",
    database: "papeleria",
    user: "root",
    password: ""
});

app.use(express.json());
app.use(express.urlencoded({extended: [ true ]}));

var sesion = {
    correo: undefined,
    contraseña: undefined,
    usuario: undefined
};

//CONECION DB ------------------------------------------------------------------
/*conexion.connect(function(error){
    if(error){
        throw(error);
    }else{
        console.log("Conexion Exitosa");
    }
});

conexion.query("select * from usuario", (error, results, fields)=>{
    if(error){
        throw error;
    }

    results.forEach(results => {
        console.log(results);
    });
});

conexion.end();
*/
//----------------------------------------------------------------------------------------------------------

app.use("/public",express.static("public"));

app.set("view engine", "pug");

//--- Index ----------------------------------------------------------------------------
app.get("/",(req, res)=>{
    res.render("index");
});

app.post("/try_login_us",(req, res)=>{
    conexion.query("select * from usuario", (error, results, fields)=>{
        if(error)
            throw error;
        
        let band = false;
        results.forEach(results => {
            if(req.body.correo == results.correo && req.body.password == results.password && results.tipo=="usu"){
                sesion = {
                    nombre: results.nombre+" "+results.apellido,
                    correo: results.correo,
                    contraseña: results.contraseña,
                    usuario: results.tipo
                };
                res.redirect("/");
                band = true;
            }
        });
        if(!band)
            res.redirect("/cliente/login")
    });
});

app.post("/try_login_em",(req, res)=>{
    conexion.query("select * from usuario", (error, results, fields)=>{
        if(error)
            throw error;
        
        let band = false;
        results.forEach(results => {
            if(req.body.correo == results.correo && req.body.password == results.password && results.tipo=="adm"){
                sesion = {
                    nombre: results.nombre+" "+results.apellido,
                    correo: results.correo,
                    contraseña: results.contraseña,
                    usuario: results.tipo
                };
                res.redirect("/inventario");
                band = true;
            }
        });
        if(!band)
            res.redirect("/empleado/login")
    });
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

app.post("/add_producto",(req, res)=>{
    let JSON = {
        nombre: req.body.nombre,
        marca: req.body.marca,
        codigo: req.body.codigo,
        size: req.body.size,
        color: req.body.color,
        precio: req.body.precio,
        descripcion: req.body.descripcion
    }

    res.redirect("/inventario");

    console.log(JSON);
});

app.post("/crear/cliente",(req, res)=>{
    res.redirect("/cliente/login");
});

app.post("/crear/empleado",(req, res)=>{
    res.redirect("/empleado/login");
});

//Lanzar servidor
app.listen(port, ()=>{
    console.log("Server launched in the port "+port);
});