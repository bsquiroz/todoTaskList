const express = require("express");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const { Users } = require("./models");

require("./config/passport");

const PORT = 8000;
const app = express();

app.use(express.urlencoded({ extended: true }));

// configurando la vista para el motor

//1. Definiendo en donde se ubicará el directorio views
app.set("views", path.join(__dirname, "views"));
//2. Definiendo el motor que usaremos
app.set("view engine", "ejs");

//Configurando el directorio publico
app.use(express.static("./public"));

//middleware de terceros
app.use(
    session({
        secret: "academlo",
        resave: false,
        saveUninitialized: true,
    })
);

const passportLocalStrategy = passport.authenticate("local", {
    successRedirect: "/tareas",
    failureRedirect: "login",
});

app.use(passport.initialize());
app.use(passport.session());

//middleware de aplicacion
//pagina de inicio
app.get("/", (req, res) => {
    res.render("pages/home", { title: "Inicio" });
});

//pagina de login
app.get("/login", (req, res) => {
    res.render("pages/login", { title: "Login" });
});
app.post("/login", passportLocalStrategy, (error, req, res, next) => {
    if (error) return console.log(error.message);
});
app.get("/logout", (req, res) => {
    req.logOut();
    return res.redirect("/login");
});

//pagina de registro
app.get("/registro", (req, res) => {
    res.render("pages/register", { title: "Registro" });
});
app.post("/registro", async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        await Users.create({ firstname, lastname, email, password });
        res.redirect("/login");
    } catch (error) {
        console.log(error);
    }
});

//=====================CUANDO ESTEMOS AUTENTICADOS===========================|||
//pagina de tareas
//autenticar la ruta, solo pasan los que estan autenticados
app.get("/tareas", (req, res) => {
    if (req.isAuthenticated()) {
        const fullName = `${req.user.firstname} ${req.user.lastname}`;
        const idUser = req.user.id;

        const dataUser = {
            fullName,
            idUser,
        };
        return res.render("pages/tasks", {
            title: "tareas",
            dataUser,
        });
    }
    return res.redirect("/login");
});
app.get("/tareas/editar/:id", (req, res) => {
    if (req.isAuthenticated()) {
        const fullName = `${req.user.firstname} ${req.user.lastname}`;
        const idUser = req.user.id;

        const dataUser = {
            fullName,
            idUser,
        };
        return res.render("pages/edit-task", {
            title: "editando tarea",
            dataUser,
        });
    }
    return res.redirect("/login");
});
app.get("/estatus", (req, res) => {
    if (req.isAuthenticated()) {
        const fullName = `${req.user.firstname} ${req.user.lastname}`;
        const idUser = req.user.id;

        const dataUser = {
            fullName,
            idUser,
        };
        return res.render("pages/status", {
            title: "estatus",
            dataUser,
        });
    }
    return res.redirect("/login");
});
app.get("/estatus/editar/:id", (req, res) => {
    if (req.isAuthenticated()) {
        const fullName = `${req.user.firstname} ${req.user.lastname}`;
        const idUser = req.user.id;

        const dataUser = {
            fullName,
            idUser,
        };
        return res.render("pages/edit-status", {
            title: "editando | estatus",
            dataUser,
        });
    }
    return res.redirect("/login");
});
app.get("/categorias", (req, res) => {
    if (req.isAuthenticated()) {
        const fullName = `${req.user.firstname} ${req.user.lastname}`;
        const idUser = req.user.id;

        const dataUser = {
            fullName,
            idUser,
        };
        return res.render("pages/categories", {
            title: "categorias",
            dataUser,
        });
    }
    return res.redirect("/login");
});
app.get("/categorias/editar/:id", (req, res) => {
    if (req.isAuthenticated()) {
        const fullName = `${req.user.firstname} ${req.user.lastname}`;
        const idUser = req.user.id;

        const dataUser = {
            fullName,
            idUser,
        };
        return res.render("pages/edit-category", {
            title: "editar | categoria",
            dataUser,
        });
    }
    return res.redirect("/login");
});

app.listen(PORT, () => {
    console.log(`servidor corriendo por el puerto ${PORT}`);
});
