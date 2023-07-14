import { Router } from "express";
import { usersModel } from "../persistencia/mongoDB/models/users.model.js";
import { compareData } from "../utils/bcrypt.js";
import {generateToken} from "../utils/jwt.js"
import passport from "passport";



const jwtRouter = Router()


jwtRouter.post ('/login', async(req, res) => {
    const {email,password} = req.body
    const userDB = await usersModel.findOne({email})
    if (!userDB) {
      return res.status(400).send('Wrong email or password')
    }
    const isPassword = await compareData(password, userDB.password)
    if (!isPassword) {
      return res.status(401).send('Wrong email or password') 
    }
    const token = generateToken (userDB)
    res.status(200).json({message:'Login', token})
  })
  

  
  jwtRouter.get('/validation', passport.authenticate('jwtStrategy', {session: false}), (req, res)=> {
    const {email} = req.user
    res.send(`Probando ${email}`)
  })

  export default jwtRouter