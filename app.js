const express = require ("express");
const { json } = require("express/lib/response");
const mysql = require ("mysql");
const { RANDOM } = require("mysql/lib/PoolSelector");
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
                console.log("Sesion Iniciada");
                res.redirect("/");
                band = true;
            }
        });
        if(!band){
            res.redirect("/cliente/login");
        }
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
                console.log("Sesion Iniciada");
                res.redirect("/inventario");
                band = true;
            }
        });
        if(!band){
            res.redirect("/empleado/login");
        }
    });
});

//--- Empleados ------------------------------------------------------------------------
//Crear cuenta
app.get("/crear-e", (req, res)=> {
    res.render("create-acc-e");
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

//Canasta
app.get("/canasta",(req, res)=>{
    res.render("cart");
});

//PAGAR 
app.get("/pay", (req, res)=> {
    res.render("pay");
});

//INTERMEDIO
app.get("/inter", (req, res)=> {
    res.render("intermedio");
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

//QUEJAS Y SUGERENCIAS
app.get("/quejas", (req, res)=> {
    res.render("quejas");
});

//PREGUNTAS FRECUENTES
app.get("/preguntas", (req, res)=> {
    res.render("preguntas");
});

//ACERCA DE 
app.get("/acerca-de", (req, res)=> {
    res.render("acerca");
});

app.get("/inventario", (req, res)=> {
    /*conexion.query("select * from producto", (error, results, fields)=>{
        if(error)
            throw error;
        
            j = {
                nombre: [],
                marca: [],
                codigo: [],
                size: [],
                color: [],
                precio: [],
                descripcion: [],
                i: 0
            }

        let band = false;
        results.forEach(results => {
                j.nombre.push(results.nombre);
                j.marca.push(results.marca);
                j.codigo.push(results.codigo);
                j.size.push(results.size);
                j.color.push(results.color);
                j.precio.push(results.precio);
                j.descripcion.push(results.descripcion);
                j.i=j.i+1;

            res.render("stock", j);
            band = true;
        });
    });
    if(!band)
        res.redirect("/");*/


    res.render("stock");
});


app.get("/agregar", (req, res)=> {
    res.render("new-product")
})

app.post("/add_producto",(req, res)=>{
    let p = {
        nombre: req.body.nombre,
        marca: req.body.marca,
        codigo: req.body.codigo,
        size: req.body.size,
        color: req.body.color,
        precio: req.body.precio,
        descripcion: req.body.descripcion
    }

    query = "insert into producto values("+"'"+p.nombre+"'"+", "+"'"+p.marca+"'"+", "+"'"+p.codigo+"'"+", "+p.size+", "+"'"+p.color+"'"+", "+p.precio+", "+"'"+p.descripcion+"'"+")"
    console.log("QUERY: "+query);

    conexion.query(query, (err, results, field)=>{
        if(err) throw err;

        console.log(results);
    });

    res.redirect("/inventario");

    console.log(JSON);
});

app.post("/crear/cliente",(req, res)=>{
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    var contraseña = "";
    for (i=0; i<8; i++) contraseña +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
    let nombre=req.body.nombre, apellido=req.body.apellido, correo=req.body.correo, password=req.body.password, usuario="usu";
    let query = "insert into usuario values ('"+contraseña+"'"+", "+"'"+nombre+"'"+", "+"'"+apellido+"'"+", "+"'"+correo+"'"+", "+"'"+password+"'"+", "+"'"+usuario+"'"+")"

    conexion.query(query,(err, results, field)=>{
        if(err) throw err

        console.log(results);
    });

    console.log(contraseña);

    res.redirect("/cliente/login");
});

app.post("/crear/empleado",(req, res)=>{
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    var contraseña = "";
    for (i=0; i<8; i++) contraseña +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
    let nombre=req.body.nombre, apellido=req.body.apellido, correo=req.body.correo, password=req.body.password, usuario="adm";
    let query = "insert into usuario values ('"+contraseña+"'"+", "+"'"+nombre+"'"+", "+"'"+apellido+"'"+", "+"'"+correo+"'"+", "+"'"+password+"'"+", "+"'"+usuario+"'"+")"

    conexion.query(query,(err, results, field)=>{
        if(err) throw err

        console.log(results);
    });

    console.log(contraseña);

    res.redirect("/empleado/login");
});

app.post("/inter2",(req, res)=>{
    if(req.body.id=="250698"){
        res.redirect("/crear-e");
    }else{
        res.redirect("/inter");
    }
});

//Lanzar servidor
app.listen(port, ()=>{
    console.log("Server launched in the port "+port);
});