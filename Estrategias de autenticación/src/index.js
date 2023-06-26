import 'dotenv/config';
import express from "express";
import productRouter from "./routes/product.routes.js";
import multer from 'multer';
import { __dirname } from "./path.js";
import { engine } from "express-handlebars";
import * as path from 'path';
import cartRouter from "./routes/cart.routes.js";
import { Server } from 'socket.io'
import mongoose from "mongoose";
import { cartModel } from './models/Cart.js';
import { productModel } from './models/Products.js';
import viewsRouter from './routes/views.routes.js'
import usersRouter from './routes/users.routes.js'
import mongoStore from 'connect-mongo'
import session from 'express-session'
import passport from 'passport';
import './passportStrategies.js'

//Configuraciones
mongoose.connect(process.env.URL_MONGODB_ATLAS)
.then(() => console.log ("DB is connected"))
.catch((error) => console.log("Error en MondoDB ;" , error))

const app = express();
const PORT = 4000;  
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, 'src/public/img')
  },
  filename: (req, file, cd) => {
    cd(null, `${file.originalname}`)  
  }
})

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})


// sessions mongo
app.use(
  session({
    store: new mongoStore({
        mongoUrl:  process.env.URL_MONGODB_ATLAS,
        ttl: 60
    }),
    secret: 'sessionSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000}
  })
)

//Handlebars (seteo motores de plantillas)
app.engine('handlebars', engine())
app.set('views', path.resolve(__dirname, './views'))
app.set('view engine', 'handlebars') 

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = (multer ({storage:storage}))

//Passport
app.use(passport.initialize());
app.use(passport.session());

//ServerIO
const io = new Server(server, {cors: {origin: "*"}})  

io.on('connection', (socket) => {
 console.log("cliente conectado")

 socket.on('mensaje', info => {
  console.log(info)
 })
 socket.on("nuevoProducto", (prod) => {
  console.log(prod)
 })
})

//Routes
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use('/api/views', viewsRouter)
app.use("/api/users", usersRouter);

app.use(express.static(path.join(__dirname, './public')));

app.post('/upload', upload.single('product'), (req, res) => {    
  console.log(req.body)
  console.log(req.file)
  res.send("Imagen subida")
})


// Ruta para guardar el mensaje en MongoDB
app.post("/save-message", (req, res) => {
  const { user, message } = req.body;

  const newMessage = new Messages({
    user: user,
    message: message,
  });

  newMessage.save()
    .then(() => {
      res.json({ success: true, message: "Mensaje guardado exitosamente." });
    })
    .catch((error) => {
      res.json({ success: false, message: "Error al guardar el mensaje.", error: error });
    });
});

app.use((req, re, next) => {
  req.io = io
  return next()
})

 
app.get("/", (req, res) => {
  res.render('home')
})
 