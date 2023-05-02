import express from "express";
import productRouter from "./routes/product.routes.js";
import multer from 'multer';
import { __dirname } from "./path.js";
import { engine } from "express-handlebars";
import * as path from 'path';
import { File } from "buffer";
import cartRouter from "./routes/cart.routes.js";
import { Server } from 'socket.io'

//Configuraciones
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

app.engine('handlebars', engine())
app.set('view engine', 'handlebars') 
app.set('views', path.resolve(__dirname, './views'))

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = (multer ({storage:storage}))

//ServerIO
const io = new Server(server)  

io.on('connection', (socket) => {
 console.log("cliente conectado")

 socket.on('mensaje', info => {
  console.log(info)
 })
 
})


//Routes
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/", express.static(__dirname + "/public"));
app.post('/upload', upload.single('product'), (req, res) => {
    
  console.log(req.body)
  console.log(req.file)
  res.send("Imagen subida")
})
 
