import "dotenv/config";
import express from "express";
import handlebars from "express-handlebars";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import multer from "multer";
import * as path from "path";
import { __dirname } from "./utils/path.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import mongoStore from "connect-mongo";
import { cartModel } from "./persistencia/mongoDB/models/cart.model.js";
import { productsModel } from "./persistencia/mongoDB/models/products.model.js";
import viewsRouter from "./routes/views.routes.js";
import usersRouter from "./routes/users.routes.js";
import cartRouter from "./routes/cart.routes.js";
import productRouter from "./routes/product.routes.js";
import messagesRouter from "./routes/messages.routes.js";
import chatRouter from "./routes/chat.routes.js";
import ticketRouter from "./routes/ticket.routes.js";
import jwtRouter from "./routes/jwt.routes.js"
import mockingRouter from "./routes/mocking.routes.js"
import passport from "passport";
import "./passportStrategies.js";
import config from "./config/config.js";
import './persistencia/mongoDB/dbConfig.js'

//Configuraciones

const app = express();
const PORT = config.port;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img");
  },
  filename: (req, file, cd) => {
    cd(null, `${file.originalname}`);
  },
});

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});



//Handlebars (seteo motores de plantillas)
app.engine("handlebars", engine());
app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "handlebars");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ storage: storage });

//Cookie
app.use(cookieParser("secretCookie"));

//generar info en cookies
app.get("/crearCookie", (req, res) => {
  res
    .cookie("cookie1", "Primera cookie", { maxAge: 10000 })
    .send("Creando primera cookie");
});

app.get("/leerCookie", (req, res) => {
  console.log(req.cookies.cookie1);
  const { cookie1 } = req.cookies;
  res.json({ message: "Leyendo cookies", cookie: cookie1 });
});

app.get("/crearcookieFirmada", (req, res) => {
  res
    .cookie("cookie1Firmada", "1234", { signed: true })
    .json({ message: "Creando cookie firmada" });
});

app.get('/leerCookieFirmada', (req,res)=>{
  console.log(req)
  const {cookie1Firmada} = req.signedCookies
  console.log(cookie1Firmada);
  res.send('Probando')
})


//ServerIO
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("cliente conectado");

  socket.on("mensaje", (info) => {
    console.log(info);
  });
  socket.on("nuevoProducto", (prod) => {
    console.log(prod);
  });
});

//Routes
app.use("api/products", productRouter);
app.use("api/cart", cartRouter);
app.use("/api/views", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/jwt", jwtRouter);
app.use("/api/message", messagesRouter);
app.use("/api/chat", chatRouter);
app.use("/api/ticket", ticketRouter)
app.use("/api/mockingproducts", mockingRouter)

app.use(express.static(path.join(__dirname, "./public")));

app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send("Imagen subida");
});


app.use((req, re, next) => {
  req.io = io;
  return next();
});

app.get("/", (req, res) => {
  res.render("home");
});
